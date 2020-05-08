import axios from 'axios';
import { Loading } from 'element-ui' // 引用element-ui的加载和消息提示组件
import Qs from 'qs';
const $axios = axios.create({
    timeout: 30000,
    baseURL: 'http://www.tianleilei.cn'
    // baseURL:'http://192.168.1.108:3000'
})
let loading = null
$axios.interceptors.request.use((config) => {
    // loading = Loading.service({ text: '拼命加载中' })
    return config;
}, (err) => {
    return Promise.reject(err);
})

$axios.interceptors.response.use((response) => {
    // if (loading) {
    //     loading.close()
    // }
    if (response.status >= 200 || response.status == 304) {
        return Promise.resolve(response.data);
    } else {
        return Promise.reject(response);
    }
}, (err) => {
    // if (loading) {
    //     loading.close()
    // }
    console.log(err);
})

export default {
    post(url, data) {
        return $axios({
            method: 'POST',
            url,
            data: data,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    },
    get(url, params) {
        return $axios({
            method: 'get',
            url,
            params
        })
    }
}


