<template>
  <div class="sidewrap">
    <div class="rightside">
      <div class="search">
        <el-input class="searchinput" v-model="search" placeholder="请输入要搜索的文章标题关键字">
          <el-button slot="append" @click="searchBtn()" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <div class="function">
        <div @click="toCreate()" class="write">
          <el-button type="primary">写文章</el-button>
        </div>
        <div @click="toShare()" class="share">
          <el-button type="primary">去分享</el-button>
        </div>
      </div>
    </div>
    <div class="notice">
      <p>你好，欢迎访问本网站，该网站是我自己开发，技术栈使用 node.js + express + mongodb + vue 用来学习与收藏一些自己觉得不错的文章以及开发中遇到的一些比较好的工具和常用的文档等。最初的目的就是为了替代自己电脑浏览器里的收藏夹。</p>

      <p>
        你也可以在该网站
        <span>分享</span>你觉得优质的文章，你也可以随便
        <span>写一篇文章</span> 就当做是写一个日记，或者总结一些东西。
      </p>

      <p>在使用分享文章以及写文章功能时，需要进行注册登录，注册登录很简单，就是直接输入自己想要的ID以及密码即可。</p>

      <p>
        因为我也是第一次做一个博客，难免会有出错的地方，如果遇到什么问题可以在关于页面给我
        <span>留言</span>
      </p>
    </div>
  </div>
</template>

<script>
import { checkLogin } from "../utils/index";
export default {
  components: {},
  data() {
    return {
      search: ""
    };
  },

  computed: {},

  watch: {},
  methods: {
    searchBtn() {
      if (!this.search) {
        this.$message({
          type: "error",
          center: true,
          offset: 50,
          message: "请输入要搜索的文章标题关键字"
        });
        return;
      }
      // console.log(this.$route)
      if (this.$route.name == "搜索") {
        // console.log("123");
        this.$store.dispatch("getSearchList",{kw:this.search})
      } else {
        this.$router.push({
          path: "/search",
          query: {
            k: this.search
          }
        });
      }
    },
    toCreate() {
      if (checkLogin()) {
        this.$router.push({
          path: "/create"
        });
      } else {
        this.$message({
          message: "请先登录",
          type: "error",
          center: true,
          offset: 50
        });
      }
    },
    toShare() {
      if (checkLogin()) {
        this.$router.push({
          path: "/center"
        });
      } else {
        this.$message({
          message: "请先登录",
          type: "error",
          center: true,
          offset: 50
        });
      }
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang='scss' >
.rightside {
  right: 2vw;
  padding: 10px 20px;
  background: #fff;
  min-height: 300px;
  .search {
    margin-top: 20px;
    height: 60px;
    .searchinput {
      height: 100%;
    }
    .el-input__inner {
      height: 100%;
    }
    margin-bottom: 20px;
  }
  .function {
    div {
      width: 100%;
      text-align: center;
      .el-button--primary {
        width: 100%;
        height: 60px;
        font-size: 20px;
      }
      margin-bottom: 10px;
    }
  }
}
// .el-input-group--append{
//     display: flex;
//     justify-content: space-around;
//     align-items: center;
// }
.notice {
  margin-top: 20px;
  background: #fff;
  width: 100%;
  padding: 20px;
  line-height: 30px;
  p {
    margin-bottom: 10px;
  }
  span {
    background: #409eff;
    padding: 0px 4px;
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
  }
}
.sidewrap {
  // background: red;
  width: 350px;
}
</style>