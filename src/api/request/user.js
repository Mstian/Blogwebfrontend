import $axios from '../service';
export async function register(data){
    // console.log(data);
    let url = '/user/reg';
    return await $axios.post(url,data)
}

export async function login (data){
    let url = '/user/login';
    return await $axios.post(url,data)
}