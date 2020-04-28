<template>
  <div class="view_article">
      <div class="ar_title">
          {{articleInfo.title}}
      </div>
      <div class="ar_info">
          <div>作者：{{articleInfo.author}}</div>
          <div>发布时间：{{articleInfo.shareTime}}</div>
          <div>分类：本站原创</div>
      </div>
      <div class="ar_content">
        <div class="markdown-body"  v-html="articleInfo.content">

        </div>
      </div>
  </div>
</template>

<script>
import {getArticleById} from '../api/request/article';
import {formmatTime} from '../utils/index';
import 'mavon-editor/dist/css/index.css'
export default {
    name:"ViewArticle",
    data:()=>{
        return{
            articleInfo:{},
            id:'',
        }
    },
    methods:{
    },
    mounted(){
        console.log(this.$route.query);
        this.id = this.$route.query.id;
        getArticleById({id:this.id})
        .then((data)=>{
            // console.log(data);
            if(data){
                data.data.shareTime = formmatTime(data.data.shareTime)
                this.articleInfo = data.data;
            }
        })
    }
}
</script>

<style lang="scss">
.view_article{
    background: #fff;
    padding: 20px;
    color: #333;
    min-height: 90vh;
    margin-bottom: 10px;
    .ar_title{
        text-align: center;
        font-size: 34px;
        // font-weight: bold;
    }
    .ar_info{
        display: flex;
        justify-content: center;
        div{
            padding: 20px;
            font-size: 18px;
        }
    }
    .ar_content{
        font-size: 22px;
        padding: 20px 200px;
        line-height: 40px;
        .markdown-body{
            // padding: 20px;
            padding-top:20px;
            background: rgb(251, 251, 251);
        }
        .markdown-body>*:first-child{
            margin: 20px;
        }
    }
}
</style>