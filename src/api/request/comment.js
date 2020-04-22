import $axios from '../service';
export async function addComment(data){
    let url = "/comment/add";
    return $axios.post(url,data);
}
export async function getCommnet(){
    let url = "/comment/get";
    return $axios.get(url);
}
export async function deleteComment(data){
    let url = "/comment/delete";
    return $axios.post(url,data);
}