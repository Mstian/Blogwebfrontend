<template>
  <div class="search">
    <div class="home_left">
      <!-- <div class="banner">
        <el-carousel height="300px" :interval="4000" arrow="always">
          <el-carousel-item v-for="(item,index) in bannerArr" :key="index">
            <div class="bannerItem" :style="{backgroundImage:'url('+item+')'}"></div>
          </el-carousel-item>
        </el-carousel>
      </div>-->
      <div class="listwrap">
        <div v-if=" $store.state.searchList<=0" class="nodata">暂时没有查询到你需要的文章，换个关键字再来搜索吧</div>
        <div class="articleList" v-for="(item,index) in $store.state.searchList" :key="index">
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
        <!-- <div class="loadmore" v-show="loading">{{loadingTxt}}</div> -->
      </div>
    </div>
     <div class="homeright">
      <rightside />
    </div>
  </div>
</template>

<script>
import { searchArticle } from "../api/request/article";
import { formmatTime } from "../utils/index";
import rightside from "../components/rightSide";
export default {
  data() {
    return {
      loading: false,
      loadingTxt: "正在拼命加载······",
      list: 10,
      articleArr: [],
      pageIndex: 1,
      pageSize: 10,
      bannerArr: [
        "https://img.zcool.cn/community/01d7b05dcd7611a8012129e293f057.jpg@1280w_1l_2o_100sh.jpg"
      ]
    };
  },
  components:{
    rightside
  },
  methods: {
    load() {
      this.pageIndex++;
      this.loading = true;
      this.getarticle(this.pageIndex, this.pageSize);
    },
    formmatTime(timestamp) {
      return formmatTime(timestamp);
    },
    readmore(item) {
      if (item.isLocal) {
        //表明是原创，去本站预览
        this.$router.push({
          path: "/viewarticle",
          query: { id: item._id }
        });
      } else {
        //表明是分享，跳转站外
        // console.log(item.link)
        window.open(item.link);
      }
    }
  },
  mounted() {
    // // console.log(this.$route.query.k);
    // searchArticle({ kw: this.$route.query.k }).then(data => {
    //   // console.log(data);
    //   if (data.err == 0) {
    //     this.articleArr = data.data;
    //   } else {
    //     this.articleArr = [];
    //   }
    // });
    this.$store.dispatch("getSearchList",{kw:this.$route.query.k})
  }
};
</script>

<style lang="scss" scoped>
.search{
  min-height:100vh;
  // background: #fff;
}
.search {
  // overflow: hidden;
  // height: 1000px; /*no*/
  // background: pink;
  padding: 0;
  display: flex;
  box-sizing: border-box;
  margin-bottom: 10px;
  .home_left {
    flex: 1;
    margin-right: 20px;
    min-height: 100%;
    background: #fff;
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
  margin-top: 10px;
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
.nodata{
  color:#333;
  font-size: 24px;
  text-align: center;
  margin-top: 40px;
}
</style>