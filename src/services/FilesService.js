/**
 * 
 * @param {URLSearchParams} params 
 * @param {Headers} headers 
 * @param {String} data 
 * @returns 
 */
export const uploadFile = async (params, headers, data) => {
    data = data.split(',')[1];
    return fetch(`http://34.168.78.33:8080/upload?${params.toString()}`, {
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
    return fetch(`http://34.168.78.33:8080/headers?${params.toString()}`, {
        method: 'get'
    })
}