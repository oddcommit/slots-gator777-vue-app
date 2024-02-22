import axios from 'axios'
import loadFile from "./loadFile.js"
import md5 from 'js-md5';
import {
    Indicator
} from 'mint-ui';
import AES from "../common/AES.js"
let ip = localStorage.getItem(md5('__baseurl__'));
let api_key = '';
let api_aes_key = '';
if(ip == null || ip == '')
{
    const json = loadFile("static/nonce", true);
    if(json != null) {
        ip = json['ip']
        api_key = json['api_key']
        api_aes_key = json['api_aes_key']
    }
}
var baseUrl = ip
const service = axios.create({
    baseURL:baseUrl,
    timeout: 10000
})

service.interceptors.request.use(
    config => {
        Indicator.open('loading...');
        if (config.method === 'post') {
            config.data = {
                ...config.data
            }
        } else {
            config.params['time'] = parseInt(new Date().getTime() / 1000);
            let arr = new Array()
            let num = 0
            for (let i in config.params) {
                arr[num] = i
                num ++
            }
            let sortArr = arr.sort()
            let md5_str = ""
            sortArr.forEach((key) => {
                if(md5_str !== "") {
                    md5_str += "&"
                }
                md5_str += key + '=' + config.params[key]
            });
            md5_str += "&md="+api_key
            let key = md5(md5_str)
            config.params['key'] = key
            // let req_data = AES.encrypt(JSON.stringify(config.params), api_aes_key)
            // let data = [];
            // data['data'] = req_data
            // config.params['XDEBUG_SESSION_START'] = 16769
            // config.params = {
            //     ...data
            // }

            config.params = {
                ...config.params
            }
        }
        config.headers['content-Type'] = 'application/json;charset=UTF-8'
        
        return config
    },
    error => {
        Indicator.close()
    }
)
service.interceptors.response.use(
    res => {
        Indicator.close();
        // let data = AES.decrypt(res.data.data, api_aes_key)

        // return JSON.parse(data)
        return res.data
    },
    error => {
        return Promise.reject(error)
    }
)
export default service;