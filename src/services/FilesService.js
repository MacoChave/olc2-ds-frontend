import { URI } from "./URI";

/**
 * 
 * @param {URLSearchParams} params 
 * @param {Headers} headers 
 * @param {String} data 
 * @returns 
 */
export const uploadFile = async (params, headers, data) => {
    data = data.split(',')[1];
    return fetch(`${URI}/upload?${params.toString()}`, {
        headers: headers,
        body: data,
        method: 'post'
    })
}

/**
 * 
 * @param {URLSearchParams} params 
 * @param {Headers} headers 
 */
export const getHeadersFile = async (params) => {
    return fetch(`${URI}/headers?${params.toString()}`, {
        method: 'get'
    })
}