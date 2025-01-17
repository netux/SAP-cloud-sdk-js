import { createLogger } from '@sap-cloud-sdk/util';
import { getXsuaaServiceCredentials } from '../environment-accessor';
import { decodeJwt } from '../jwt';
import { DestinationFetchOptions } from './destination-accessor-types';
import {
  DefaultDestinationCache,
  DestinationCache,
  IsolationStrategy,
  getDefaultIsolationStrategy
} from './destination-cache';
import {
  Destination,
  DestinationAuthToken,
  isHttpDestination
} from './destination-service-types';
import {
  addProxyConfigurationInternet,
  proxyStrategy
} from './http-proxy-util';

const logger = createLogger({
  package: 'connectivity',
  messageContext: 'register-destination'
});

/**
 * @internal
 */
export const registerDestinationCache = DestinationCache(
  new DefaultDestinationCache(undefined)
);

/**
 * @experimental This API is experimental and might change in newer versions. Use with caution.
 *
 * Represents options to configure how a destination should be registered.
 */
export type RegisterDestinationOptions = Pick<
  DestinationFetchOptions,
  'jwt' | 'isolationStrategy'
> & { inferMtls?: boolean };

/**
 * Registers a destination in a cache for later usage.
 *
 * If a destination with the same key is already in the cache, it is replaced.
 * The key is built using the `getDestinationCacheKey` method.
 * @param destination - A destination to add to the `destinations` cache.
 * @param options - Options how to cache the destination.
 */
export async function registerDestination(
  destination: DestinationWithName,
  options?: RegisterDestinationOptions
): Promise<void> {
  if (!destination.name) {
    throw Error('Registering destinations requires a destination name.');
  }

  destination.mtls = !!options?.inferMtls;

  await registerDestinationCache.cacheRetrievedDestination(
    decodedJwtOrZid(options),
    destination,
    isolationStrategy(options)
  );
}

/**
 * Represents a destination with a `name` property.
 */
export type DestinationWithName = Destination & { name: string };

/**
 * @internal
 * @param options - The options for searching the cache
 * @returns Destination - the destination from cache
 */
export async function searchRegisteredDestination(
  options: DestinationFetchOptions
): Promise<Destination | null> {
  let decodedJwt: Record<string, any>;
  // An error will be thrown if no JWT and no xsuaa service exist.
  try {
    decodedJwt = decodedJwtOrZid(options);
  } catch (e) {
    logger.debug(
      'Failed to retrieve registered destination, because it was neither possible to decode JWT nor create a dummy JWT with `zid` property.'
    );
    logger.debug(e);
    return null;
  }

  const destination =
    await registerDestinationCache.retrieveDestinationFromCache(
      decodedJwt,
      options.destinationName,
      isolationStrategy(options)
    );

  if (!destination) {
    logger.debug(
      `Could not retrieve '${options.destinationName}' from registered destinations.`
    );
    return null;
  }

  logger.info(
    `Successfully retrieved destination '${options.destinationName}' from registered destinations.`
  );

  if (destination.forwardAuthToken) {
    destination.authTokens = destinationAuthToken(options.jwt);
  }

  return isHttpDestination(destination) &&
    ['internet', 'private-link'].includes(proxyStrategy(destination))
    ? addProxyConfigurationInternet(destination)
    : destination;
}

/**
 * If an explicit isolation strategy is given by the user this is used. If not the isolation strategy is determined in the following way:
 * If a JWT is given and it contains a user_id the isolation is 'TenantUser'. If no JWT is given or it does not contain a user the isolation is 'Tenant'.
 * @param options - Options passed to register the destination containing the jwt.
 * @returns The isolation strategy.
 */
function isolationStrategy(
  options?: RegisterDestinationOptions
): IsolationStrategy {
  if (options?.isolationStrategy) {
    return options.isolationStrategy;
  }
  const decoded = options?.jwt ? decodeJwt(options.jwt) : undefined;
  return getDefaultIsolationStrategy(decoded);
}

/**
 * This method either decodes the given JWT. If the JWT is not given it will use the subdomain if the XSUAA and create a Object with zid this subdomain.
 * This is then passed on to build the cache key.
 * @param options - Options passed to register the destination containing the jwt.
 * @returns The decoded JWT or a dummy JWT containing the tenant identifier (zid).
 * @internal
 */
export function decodedJwtOrZid(
  options?: RegisterDestinationOptions
): Record<string, any> {
  if (options?.jwt) {
    return decodeJwt(options.jwt);
  }

  const providerTenantId = getXsuaaServiceCredentials(
    options?.jwt
  ).subaccountid;

  return { zid: providerTenantId };
}

function destinationAuthToken(
  token?: string
): [DestinationAuthToken] | undefined {
  if (token) {
    const decoded = decodeJwt(token);
    logger.debug(
      "Option 'forwardAuthToken' enabled on destination. Using the initial token for the destination."
    );
    return [
      {
        value: token,
        expiresIn: decoded.exp!.toString(),
        error: null,
        http_header: { key: 'Authorization', value: `Bearer ${token}` },
        type: 'Bearer'
      }
    ];
  }
  logger.warn(
    "Option 'forwardAuthToken' was set on destination but no token was provided to forward. This is most likely unintended and will lead to a authorization error on request execution."
  );
}
