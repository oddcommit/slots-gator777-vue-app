import request from './request.js'

export function doPost(params) {
    return request({
        method: 'get',
        params
    })
}