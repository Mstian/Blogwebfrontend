<template>
  <div
    class="home infinite-list"
    infinite-scroll-disabled="loading"
    v-infinite-scroll="load"
    infinite-scroll-distance="40"
    style="overflow:auto"
  >
    <div class="home_left">
      <div class="banner">
        <el-carousel height="300px" :interval="4000" arrow="always">
          <el-carousel-item v-for="(item,index) in bannerArr" :key="item._id">
            <div class="bannerItem" :style="{backgroundImage:'url('+item.url+')'}" @click="toBannerLink(item.link)"></div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="listwrap">
        <div class="articleList" v-for="(item,index) in articleArr" :key="index">
          <div @click="readmore(item)" class="title">{{item.title}}</div>
          <div class="bot">
            <div v-if="item.author" class="author">
              <!-- 原创作者 -->
              <span>作者：</span>
              <span>{{item.author}}</span>
            </div>
            <!-- 分享作者 -->
            <div v-if="item.shareUser" class="shareuser">
              <span>分享人：</span>
              <span>{{item.shareUser}}</span>
            </div>
            <div class="cate">
              <span>分类：</span>
              <span>{{item.categoryId==0 ? '文章': '本站原创'}}</span>
            </div>
            <div class="time">
              <span>时间：</span>
              <span>{{formmatTime(item.shareTime)}}</span>
            </div>
            <div v-if="item.isLocal" class="local">
              <span style="color:#409EFF">本站原创</span>
            </div>
          </div>
        </div>
        <div class="loadmore" v-show="loading">
            {{loadingTxt}}
        </div>
      </div>
    </div>
    <div class="homeright">
      <rightside />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import rightside from "../components/rightSide";
import { formmatTime } from "../utils/index";
import { getHomeArticle } from "../api/request/article";
import {getBanner} from '../api/request/banner';
export default {
  name: "Home",
  components: {
    rightside
  },
  data() {
    return {
      loading: false,
      loadingTxt:'正在拼命加载······',
      list: 10,
      articleArr: [],
      pageIndex: 1,
      pageSize: 10,
      curpage:0,
      allpage:0,
      bannerArr: []
    };
  },
  methods: {
    load() {
      // console.log(124);
      if(this.allpage == this.curpage){
         this.loadingTxt = '暂无更多数据';
         this.loading = true;
         return;
      }
      this.pageIndex ++;
      this.loading = true;
      this.getarticle(this.pageIndex,this.pageSize);
    },
    formmatTime(timestamp) {
      return formmatTime(timestamp);
    },
    getarticle(pageIndex, pageSize) {
      getHomeArticle({
        pageIndex: pageIndex,
        pageSize: pageSize
      }).then(data => {
        this.articleArr = this.articleArr.concat(data.info.data);
        this.loading = false;
        // console.log(data)
        this.curpage = data.info.curpage;
        this.allpage = data.info.allpage;
        if(data.info.allpage == data.info.curpage){
          this.loadingTxt = '暂无更多数据';
          this.loading = true;
        }
      });
    },
    readmore(item){
      if(item.isLocal){ //表明是原创，去本站预览
        this.$router.push({
          path:'/viewarticle',
          query:{id:item._id}
        })
      }else{ //表明是分享，跳转站外
      // console.log(item.link)
        window.open(item.link)
      }
    },
    async getBanner(){
      let data = await getBanner();
      console.log(data)
      if(data.err == 0){
        this.bannerArr = data.data;
      }
    },
    toBannerLink(link){
      window.open(link);
    }
  },
  computed: {},
  mounted() {
    this.getarticle(this.pageIndex,this.pageSize);
    this.getBanner();
  }
};
</script>
<style lang="scss">
.home::-webkit-scrollbar {
  display: none;
}

.home {
  // overflow: hidden;
  // min-height: 100vh;
  height: calc(100vh - 172px);
  // background: pink;
  padding: 0;
  display: flex;
  box-sizing: border-box;
  .home_left {
    flex: 1;
    margin-right: 20px;
  }
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  // height: 400px;
  margin: 0;
}

.banner {
  margin-bottom: 20px;
}
.bannerItem {
  width: 100%;
  height: 100%;
  // background: red;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.listwrap {
  margin-top: 20px;
  margin-bottom: 20px;
  background: #fff;
}
.articleList {
  // background: #eee;
  background: #fff;
  padding: 20px 20px;
  border-bottom: 1px solid #eee;
}
.articleList .title {
  font-size: 20px;
  // font-weight: ;
  cursor: pointer;
}
.articleList .bot {
  font-size: 18px;
  display: flex;
  justify-content: flex-start;
  div {
    margin-top: 20px;
    margin-right: 20px;
    span:nth-child(odd) {
      color: #999;
    }
    span:nth-child(even) {
      color: #666;
    }
  }
}
.articleList:hover {
  background: #f8f8f8;
}
.loadmore {
  height: 60px;
  line-height: 60px;
  text-align: center;
  color: #666;
  font-size: 20px;
}
</style>