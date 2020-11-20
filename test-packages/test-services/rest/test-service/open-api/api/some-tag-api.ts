/* tslint:disable */
/* eslint-disable */
/**
 * Test API
 * Test API
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import globalAxios, { AxiosPromise, AxiosInstance } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
// @ts-ignore
import { TestEntity } from '../model';
/**
 * SomeTagApi - axios parameter creator
 * @export
 */
export const SomeTagApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Create entity
         * @summary Create entity
         * @param {TestEntity} [testEntity] Enitity to create
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createEntity: async (testEntity?: TestEntity, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/entities`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof testEntity !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(testEntity !== undefined ? testEntity : {}) : (testEntity || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * Get all entities
         * @summary Get entities
         * @param {number} [limit] maximum number of records to return
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAllEntities: async (limit?: number, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/entities`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (limit !== undefined) {
                localVarQueryParameter['limit'] = limit;
            }


    
            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * Get entity by id
         * @summary Get entity by id
         * @param {string} entityId Key property of the entity
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getEntityByKey: async (entityId: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'entityId' is not null or undefined
            if (entityId === null || entityId === undefined) {
                throw new RequiredError('entityId','Required parameter entityId was null or undefined when calling getEntityByKey.');
            }
            const localVarPath = `/entities/{entityId}`
                .replace(`{${"entityId"}}`, encodeURIComponent(String(entityId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * SomeTagApi - functional programming interface
 * @export
 */
export const SomeTagApiFp = function(configuration?: Configuration) {
    return {
        /**
         * Create entity
         * @summary Create entity
         * @param {TestEntity} [testEntity] Enitity to create
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createEntity(testEntity?: TestEntity, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await SomeTagApiAxiosParamCreator(configuration).createEntity(testEntity, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Get all entities
         * @summary Get entities
         * @param {number} [limit] maximum number of records to return
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getAllEntities(limit?: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<TestEntity>>> {
            const localVarAxiosArgs = await SomeTagApiAxiosParamCreator(configuration).getAllEntities(limit, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Get entity by id
         * @summary Get entity by id
         * @param {string} entityId Key property of the entity
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getEntityByKey(entityId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<TestEntity>>> {
            const localVarAxiosArgs = await SomeTagApiAxiosParamCreator(configuration).getEntityByKey(entityId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * SomeTagApi - factory interface
 * @export
 */
export const SomeTagApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * Create entity
         * @summary Create entity
         * @param {TestEntity} [testEntity] Enitity to create
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createEntity(testEntity?: TestEntity, options?: any): AxiosPromise<void> {
            return SomeTagApiFp(configuration).createEntity(testEntity, options).then((request) => request(axios, basePath));
        },
        /**
         * Get all entities
         * @summary Get entities
         * @param {number} [limit] maximum number of records to return
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAllEntities(limit?: number, options?: any): AxiosPromise<Array<TestEntity>> {
            return SomeTagApiFp(configuration).getAllEntities(limit, options).then((request) => request(axios, basePath));
        },
        /**
         * Get entity by id
         * @summary Get entity by id
         * @param {string} entityId Key property of the entity
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getEntityByKey(entityId: string, options?: any): AxiosPromise<Array<TestEntity>> {
            return SomeTagApiFp(configuration).getEntityByKey(entityId, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * SomeTagApi - object-oriented interface
 * @export
 * @class SomeTagApi
 * @extends {BaseAPI}
 */
export class SomeTagApi extends BaseAPI {
    /**
     * Create entity
     * @summary Create entity
     * @param {TestEntity} [testEntity] Enitity to create
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SomeTagApi
     */
    public createEntity(testEntity?: TestEntity, options?: any) {
        return SomeTagApiFp(this.configuration).createEntity(testEntity, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Get all entities
     * @summary Get entities
     * @param {number} [limit] maximum number of records to return
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SomeTagApi
     */
    public getAllEntities(limit?: number, options?: any) {
        return SomeTagApiFp(this.configuration).getAllEntities(limit, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Get entity by id
     * @summary Get entity by id
     * @param {string} entityId Key property of the entity
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SomeTagApi
     */
    public getEntityByKey(entityId: string, options?: any) {
        return SomeTagApiFp(this.configuration).getEntityByKey(entityId, options).then((request) => request(this.axios, this.basePath));
    }
}