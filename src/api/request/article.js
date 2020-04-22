import $axios from '../service';

export async function createArticle(data){ //写文章
    let url = '/article/write'
    return $axios.post(url,data);
}

export async function getArticleById(data){ //获取文章详情
    let url = '/article/getbyid';
    return $axios.get(url,data);
}

export async function getHomeArticle(data){ //首页获取文章列表
    let url = '/article/get';
    return $axios.post(url,data);
}

export async function createCraft(data){ //存草稿
    let url = '/article/addcraft';
    return $axios.post(url,data);
}

export async function updateCraft(data){//修改草稿
    let url = '/article/editcraft';
    return $axios.post(url,data);
}

export async function shareArticle(data){ //分享文章
    let url = '/article/add';
    return $axios.post(url,data);
}

export async function userShare(data){ //获取用户分享文章列表
    let url = '/article/usershare';
    return $axios.post(url,data);
}

export async function userPublish(data){ //获取用户发布文章列表
    let url = '/article/userpublish';
    return $axios.post(url,data);
}

export async function userCraft(data){ //获取用户草稿箱列表
    let url = '/article/usercraft';
    return $axios.post(url,data);
}

export async function deleteCraft(data){ //删除用户草稿箱
    let url = '/article/deletecraft';
    return $axios.post(url,data)
}

export async function deleteArticleById(data){ //删除分享 或者 发布
    let url = '/article/deletebyid';
    return $axios.post(url,data)
}

export async function updateArticle(data){ //已发布文章编辑
    let url ="/article/edit";
    return $axios.post(url,data);
}

export async function publishToCraft(data){ //已发布文章保存为草稿
    let url = "/article/publishtocraft";
    return $axios.post(url,data);
}

export async function getCraftById(data){ //草稿先文章编辑
    let url = '/article/getcraftbyid';
    return $axios.get(url,data);
}

export async function publishCraft(data){ //草稿箱文章发布
    let url = '/article/publishcraft';
    return $axios.post(url,data)
}

export async function searchArticle(data){
    let url = "/article/getbykw";
    return $axios.get(url,data);
}