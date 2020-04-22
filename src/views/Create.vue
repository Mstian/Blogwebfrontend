<template>
  <div class="write">
    <div class="write_left">
      <div class="title">
        <el-input v-model="title" :autofocus="autofocus" placeholder="请输入标题"></el-input>
      </div>
      <mavon-editor :ishljs="ishljs" :toolbars="toolbars" v-model="content" />
      <div class="rightbar">
        <div class="write_oprate">
          <el-button @click="save()" type="primary">去发布</el-button>
          <el-button @click="saveCraft()" type="info">保存草稿</el-button>
        </div>
      </div>
      <div v-show="isMaskShow" class="mask">
        <div>
          <div class="publishsuccess">发布成功</div>
          <div class="publishsuccess_btn">
            <el-button @click="checkArticle()" class="checkarticle" type="success" round>查看文章</el-button>
            <el-button @click="backToHome()" class="backtohome" type="info" round>返回首页</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="write_right">
      <div>注意：</div>
      <p>写文章暂不支持上传音频、视频等，如果需要在写文章的同时需要添加图片，请使用 <span>图床</span> 功能。</p>
    </div>
  </div>
</template>

<script>
import {
  createArticle,
  createCraft,
  updateCraft,
  getArticleById,
  updateArticle,
  publishToCraft, //已发布存草稿
  getCraftById, //草稿箱详情
  publishCraft //草稿箱文章发布
} from "../api/request/article";

import Marked from "marked";
export default {
  components: {},
  data() {
    return {
      autofocus: true,
      content: "",
      toolbars: {},
      ishljs: true,
      title: "",
      isMaskShow: false,
      aid: "",
      craftid: "",
      isEdit: false,
      isCraftEdit: false
    };
  },
  computed: {},
  watch: {},
  methods: {
    save() {
      if (this.title == "") {
        this.$message({
          message: "请输入文章标题",
          type: "error",
          center: true,
          offset: 50
        });
        return;
      }
      if (this.content == "") {
        this.$message({
          message: "请输入文章内容",
          type: "error",
          center: true,
          offset: 50
        });
        return;
      }
      if (this.isEdit) {
        //通过编辑发布
        updateArticle({
          title: this.title,
          author: this.$store.state.userName,
          uid: this.$store.state.uid,
          content: document.querySelector(".v-note-show").innerHTML,
          content_md: this.content,
          id: this.$route.query.id
        }).then(data => {
          // console.log(data);
          if (data.err == 0) {
            this.title = "";
            this.content = "";
            this.aid = data.data._id;
            this.isMaskShow = true;
          }
        });
        return;
      }

      //草稿箱文章发布
      if (this.isCraftEdit) {
        // console.log(1);
        publishCraft({
          title: this.title,
          author: this.$store.state.userName,
          uid: this.$store.state.uid,
          id: this.$route.query.craftid,
          content: document.querySelector(".v-note-show").innerHTML,
          content_md: this.content
        }).then(data => {
          if (data.err == 0) {
            this.title = "";
            this.content = "";
            this.aid = data.data._id;
            this.$router.push({
              path: "/viewarticle",
              query: {
                id: data.data._id
              }
            });
            this.$message({
              message: "发布成功！",
              type: "success",
              center: true,
              offset: 50
            });
          }
        });
        return;
      }

      createArticle({
        //正常发布
        title: this.title,
        content: document.querySelector(".v-note-show").innerHTML,
        uid: this.$store.state.uid,
        author: this.$store.state.userName,
        content_md: this.content
      }).then(data => {
        if (data.err == 0) {
          // console.log(data);
          //文章写入成功
          this.title = "";
          this.content = "";
          this.aid = data.data._id;
          this.isMaskShow = true;
        } else {
        }
      });
    },
    saveCraft() {
      //草稿箱
      if (this.title == "") {
        this.$message({
          message: "请输入文章标题",
          type: "error",
          center: true,
          offset: 50
        });
        return;
      }

      if (this.content == "") {
        this.$message({
          message: "请输入文章内容",
          type: "error",
          center: true,
          offset: 50
        });
        return;
      }

      if (this.isEdit) {
        console.log(1);
        //我的发布直接从编辑到存草稿
        publishToCraft({
          title: this.title,
          author: this.$store.state.userName,
          uid: this.$store.state.uid,
          id: this.$route.query.id,
          content: document.querySelector(".v-note-show").innerHTML,
          content_md: this.content
        }).then(data => {
          // console.log(data);
          if (data.err == 0) {
            this.$message({
              message: data.msg,
              type: "success",
              center: true,
              offset: 50
            });
            this.$router.replace({
              path: "/center",
              query: {
                active: "craft"
              }
            });
            this.craftid = data.data._id;
            // this.getEditCraft(data.data._id);
          }
        });

        return;
      }

      if (this.craftid) {
        //修改草稿
        updateCraft({
          title: this.title,
          id: this.craftid,
          content: document.querySelector(".v-note-show").innerHTML,
          uid: this.$store.state.uid,
          author: this.$store.state.userName,
          content_md: this.content
        }).then(data => {
          if (data.err == 0) {
            this.$message({
              message: "草稿修改成功，可在个人中心草稿箱查看",
              type: "success",
              center: true,
              offset: 50
            });
          }
        });
      } else {
        //新建草稿
        createCraft({
          title: this.title,
          content: document.querySelector(".v-note-show").innerHTML,
          uid: this.$store.state.uid,
          author: this.$store.state.userName,
          content_md: this.content
        }).then(data => {
          // console.log(data);
          if (data.err == 0) {
            this.craftid = data.data._id;
            this.title = data.data.title;
            this.content = data.data.content_md;
            this.$message({
              message: "存储草稿箱成功，可在个人中心草稿箱查看",
              type: "success",
              center: true,
              offset: 50
            });
          }
        });
      }

      // console.log(this.)
    },
    backToHome() {
      this.$router.push({
        path: "/"
      });
    },
    checkArticle() {
      this.$router.push({
        path: "/viewarticle",
        query: {
          id: this.aid
        }
      });
    },
    getEditArticle(id) {
      this.isEdit = true;
      getArticleById(id).then(data => {
        if (data.err == 0) {
          // console.log(data.data.title);
          this.title = data.data.title;
          this.content = data.data.content_md;
        }
      });
    },
    getEditCraft(id) {
      this.isCraftEdit = true;
      getCraftById(id).then(data => {
        if (data.err == 0) {
          this.craftid = this.$route.query.craftid;
          this.title = data.data.title;
          this.content = data.data.content_md;
        }
      });
    }
  },
  created() {},
  mounted() {
    // console.log(this.$route.query.id);
    if (this.$route.query.id) {
      this.getEditArticle({ id: this.$route.query.id });
    }
    if (this.$route.query.craftid) {
      this.getEditCraft({ id: this.$route.query.craftid });
    }
  }
};
</script>
<style lang='scss'>
.write {
  .title {
    margin-bottom: 10px;
    .el-input__inner {
      height: 60px;
      font-size: 20px;
    }
  }
}
div .markdown-body {
  min-height: 78vh;
}
.write {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.rightbar {
  position: absolute;
  right: 0px;
  top: 0px;
  z-index: 99;
}
.write_oprate {
  .el-button--primary {
    height: 60px;
    font-size: 20px;
    // margin-left:-80px
    margin-right: 8px;
  }
  .el-button--info {
    height: 60px;
    font-size: 20px;
  }
}
.publishsuccess_btn {
  .el-button--info {
    height: 60px;
    font-size: 20px;
  }
}
.craft {
  margin-top: 20px;
}
.mask {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999999;
  background: #fff;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.publishsuccess {
  font-size: 60px;
  color: #ff3030;
  font-weight: bold;
  padding: 30px;
}
.checkarticle {
  height: 60px;
  font-size: 20px;
}
.backtohome {
  height: 60px;
}
.el-button.is-round {
  border-radius: 99999999999999999px;
}
.write_left{
  flex: 1;
}
.write_right{
  width: 17%;
  background: #fff;
  margin-left: 10px;
  padding: 20px;
  padding-top: 80px;
  line-height: 28px;
  text-align: justify;
  border-radius: 8px;
  span{
    background: #409eff;
    padding: 0px 4px;
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
  }
}

</style>