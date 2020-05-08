import $axios from '../service'
export async function getFriendChain(){
    let url = '/friend/get';
    return $axios.get(url);
}