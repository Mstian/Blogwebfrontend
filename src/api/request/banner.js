import $axios from '../service';

export async function getBanner(){
    let url = '/banner/get';
    return $axios.get(url);
}