import { URI } from "./URI"

/**
 * Send a request to the server to analyze the text
 * @param {Headers} headers Headers to send to the server
 * @param {Object} data Data to send to the server
 * @returns Response from the server
 */
export const sendAnalize = async (headers, data) => {
    console.log(data)
    return fetch(
        `${URI}/analize`,
        {
            headers: headers,
            body: JSON.stringify(data),
            method: 'post'
        }
    )
}