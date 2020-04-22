<template>
  <div class="userCenter">
    <div class="shareInput">
      <div>
        <el-input v-model="shareTitle" placeholder="请输入文章标题"></el-input>
      </div>
      <div>
        <el-input v-model="shareLink" placeholder="请输入文章链接"></el-input>
      </div>
      <div>
        <el-button @click="toShare()" type="primary" round>点击分享</el-button>
      </div>
      <div class="u_notice">
        <p>注意：</p>
        <p>1.分享的文章可以是你自己在其他网站写的，比如简书，掘金，微信公众号等等，也可以不是你写的，你读过之后觉得比较优质的文章也可以分享到本站。</p>
        <p>2.分享标题可以根据文章的立意自取通俗易懂即可。</p>
        <p>3.分享内容必须为健康积极的内容，可以是技术分享、心灵鸡汤，也可以是生活感悟等等。</p>
        <p>4.如果被分享的文章有侵权嫌疑，可以自行删除或者联系本站作者进行处理。如有其他问题也可以联系本站作者进行处理。</p>
      </div>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick" class="tabs">
      <el-tab-pane label="我的分享" name="first">
        <div v-for="(item,index) in userShareList" :key="index" class="list">
          <div class="wrap">
            <div  @click="shareJump(item.link)"  class="title">{{item.title}}</div>
            <div class="info">
              <span class="user">分享人：{{item.shareUser}}</span>
              <span class="time">时间：{{formmatTime(item.shareTime)}}</span>
            </div>
            <div class="edit">
              <span @click="deleteArticleById(item._id,'share')" class="iconfont icon-shanchu"></span>
              <!-- <span class="iconfont icon-bianji"></span> -->
            </div>
          </div>
        </div>
        <div class="no_articles" v-if="userShareList.length<=0">您还没有分享一篇文章呢</div>
      </el-tab-pane>
      <el-tab-pane label="我的发布" name="second">
        <div v-for="(item,index) in userPublishList" :key="index" class="list">
          <div class="wrap">
            <div @click="toPreviewPage(item._id)" class="title">{{item.title}}</div>
            <div class="info">
              <span class="user">作者：{{item.author}}</span>
              <span class="time">时间：{{formmatTime(item.shareTime)}}</span>
            </div>
            <div class="edit">
              <span @click="deleteArticleById(item._id,'publish')" class="iconfont icon-shanchu"></span>
              <span @click="editArticleById(item._id)" class="iconfont icon-bianji"></span>
            </div>
          </div>
        </div>
        <div class="no_articles" v-if="userPublishList.length<=0">您还没有发布一篇文章呢</div>
      </el-tab-pane>
      <el-tab-pane label="我的草稿箱" name="third">
        <div v-for="(item,index) in userCraftList" :key="index" class="list">
          <div class="wrap">
            <div @click="editCraft(item._id)" class="title">{{item.title}}</div>
            <div class="info">
              <span class="user">作者：{{item.author}}</span>
              <span class="time">时间：{{formmatTime(item.shareTime)}}</span>
            </div>
            <div class="edit">
              <span @click="deleteCraft(item._id)" class="iconfont icon-shanchu"></span>
              <span @click="editCraft(item._id)" class="iconfont icon-bianji"></span>
            </div>
          </div>
        </div>
        <div class="no_articles" v-if="userCraftList.length<=0">到现在为止，您的草稿箱是空的哦</div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { checkUrl, formmatTime } from "../utils/index";
// import {  } from "../utils/index";
import {
  shareArticle,
  userShare,
  userPublish,
  userCraft,
  deleteCraft,
  deleteArticleById
} from "../api/request/article";
export default {
  data() {
    return {
      activeName: "first",
      shareTitle: "",
      shareLink: "",
      userShareList: [],
      userPublishList: [],
      userCraftList: []
    };
  },
  methods: {
    shareJump(link){
      window.open(link);
    },
    toPreviewPage(id){
      this.$router.push({
        path:"/viewarticle",
        query:{
          id:id
        }
      })
    },
    // toEditPage(id){

    // },
    editArticleById(id) {
      //编辑文章
      this.$router.push({
        path: "/create",
        query: {
          id: id
        }
      });
    },
    editCraft(id) {
      this.$router.push({
        path: "/create",
        query: {
          craftid: id
        }
      });
    },
    handleClick(tab, event) {},
    deleteCraft(id) {
      this.$confirm("你真的真的想好要删除吗？？？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteCraft({ id: id, uid: this.$store.state.uid }).then(data => {
            if (data.err == 0) {
              this.$message({
                type: "success",
                center: true,
                offset: 50,
                message: "删除成功"
              });
              this.getUserCraft();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            center: true,
            offset: 50,
            message: "已取消删除"
          });
        });
    },
    deleteArticleById(id, type) {
      this.$confirm("你真的真的想好要删除吗？？？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteArticleById({ id }).then(data => {
            // console.log(data);
            if (data.err == 0) {
              this.$message({
                message: "删除成功",
                type: "success",
                center: true,
                offset: 50
              });
            }
            if (type == "share") {
              this.getUserShare();
            } else {
              this.getUserPublish();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            center: true,
            offset: 50,
            message: "已取消删除"
          });
        });
    },
    formmatTime(timestamp) {
      return formmatTime(timestamp);
    },
    toShare() {
      if (!this.shareTitle) {
        this.$message({
          message: "请输入分享文章标题",
          type: "error",
          center: true,
          offset: 50
        });
        return;
      }
      if (!this.shareLink) {
        this.$message({
          message: "请输入分享文章链接",
          type: "error",
          center: true,
          offset: 50
        });
        return;
      }
      if (!checkUrl(this.shareLink)) {
        this.$message({
          message: "请输入正确的链接地址",
          type: "error",
          center: true,
          offset: 50
        });
        return;
      }
      shareArticle({
        title: this.shareTitle,
        link: this.shareLink,
        shareUser: this.$store.state.userName,
        uid: this.$store.state.uid,
        categoryId: 0
      }).then(data => {
        if (data.err == 0) {
          this.getUserShare();
          this.$message({
            message: "恭喜呦，分享成功啦",
            type: "success",
            center: true,
            offset: 50
          });
          this.shareTitle = "";
          this.shareLink = "";
        } else {
          this.$message({
            message: data.msg,
            type: "error",
            center: true,
            offset: 50
          });
        }
      });
    },
    // userShare,userPublish,userCraft
    getUserShare() {
      userShare({
        uid: this.$store.state.uid
      }).then(data => {
        this.userShareList = data.data;
        // console.log(data);
      });
    },
    getUserPublish() {
      userPublish({
        uid: this.$store.state.uid
      }).then(data => {
        // console.log(data);
        this.userPublishList = data.data;
      });
    },
    getUserCraft() {
      userCraft({
        uid: this.$store.state.uid
      }).then(data => {
        this.userCraftList = data.data;
        // console.log(data);
      });
    }
  },
  mounted() {
    this.getUserShare();
    this.getUserPublish();
    this.getUserCraft();
    if (this.$route.query.active == "craft") {
      this.activeName = "third";
    }
  }
};
</script>
<style lang='scss'>
.userCenter {
  color: #fff;
  min-height: 90vh;
  background: #fff;
  margin-bottom: 10px;
  padding: 20px;
}
.tabs {
  color: #333;
  .el-tabs__header {
    user-select: none;
    text-align: center;
  }
  .el-tabs--left .el-tabs__item.is-left {
    text-align: center;
  }
  .el-tabs__item {
    font-size: 20px;
    color: #333;
  }
  .el-tabs__item.is-active {
    color: #ff3030;
  }
  .el-tabs__item:hover {
    color: #ff3030;
  }
  .el-tabs__active-bar {
    background: #ff3030;
  }
}
.shareInput {
  min-height: 300px;
  position: relative;
  > div {
    height: 90px;
    // background: red;
    width: 600px;

    // margin: 0 auto;
    .el-input__inner {
      height: 55px;
      font-size: 20px;
    }
    .el-button.is-round {
      height: 50px;
      border-radius: 999999px;
      font-size: 20px;
    }
  }
  .u_notice {
    position: absolute;
    right: 0;
    top: 0;
    // width: 100px;
    // height: 100px;
    // background: red;
    color: #333;
    line-height: 40px;
  }
}
.list {
  background: #fff;
  width: 50%;
  line-height: 30px;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  position: relative;
  .title {
    font-size: 20px;
    width: 500px;
    // background: red;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .info {
    color: #666;
    span {
      margin-right: 20px;
    }
  }
  .edit {
    position: absolute;
    right: 0;
    top: 0;
    margin-top: 20px;
    span {
      display: inline-block;
      height: 40px;
      width: 50px;
      cursor: pointer;
    }
    span.iconfont {
      font-size: 24px;
      // color: ;
      // icon-shanchu
    }
    .icon-shanchu {
      color: #fff;
    }
    .icon-bianji {
      color: #fff;
    }
  }
}

.list:hover {
  background: #fafafa;
  // border-bottom: 1px solid #fff;
}
.list:hover .icon-shanchu {
  color: #999;
}
.list:hover .icon-bianji {
  color: #666;
}
.no_articles {
  font-size: 40px;
  color: #999;
  text-align: left;
  line-height: 60px;
}
//@import url(); 引入公共css类
</style>