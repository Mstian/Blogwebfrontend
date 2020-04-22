import $axios from '../service';

export async function getstudycate(){
    let url = '/study/getallstudy';
    return $axios.get(url)
}

