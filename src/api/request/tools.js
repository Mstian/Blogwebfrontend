import $axios from '../service';

export async function gettools(){
    let url = '/tools/gettools';
    return $axios.get(url);
}