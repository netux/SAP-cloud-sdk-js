import { HttpDestination } from '@sap-cloud-sdk/connectivity/internal';

/**
 * The path in the sub request should be serialized as an absolute or relative URL.
 */
export type BatchSubRequestPathType =
  | 'absolute'
  | 'relativeToService'
  | 'relativeToEntity';

/**
 * Options to configure batch serialization.
 * @internal
 */
export interface BatchRequestSerializationOptions {
  /**
   * @internal
   */
  subRequestPathType?: BatchSubRequestPathType;
  /**
   * @internal
   */
  destination?: HttpDestination;
}
