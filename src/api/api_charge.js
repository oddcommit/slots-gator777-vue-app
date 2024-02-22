import request_charge from './request_charge.js'

export function doPostCharge(params) {
    return request_charge({
        method: 'get',
        params
    })
}