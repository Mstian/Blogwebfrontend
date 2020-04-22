<template>
  <div>
    <showlog/>
    <div id="appnav">
      <div class="navwrap">
        <router-link v-for="(item,index) in this.$store.state.routes" :key="index" :to="item.path">
          <span v-if="item.meta.show">{{item.meta.cn}}</span>
        </router-link>
        <div class="loginBtn" v-if="!$store.state.uid">
          <el-button type="text" @click="openLogin()">登录</el-button>
        </div>
        <div class="loginBtn" v-if="$store.state.uid">
          <el-dropdown>
            <span class="el-dropdown-link">{{$store.state.userName}}</span>
            <el-dropdown-menu>
              <el-dropdown-item>
                <div @click="outlogin()">退出</div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import showlog from "./showlog";
export default {
  components: {
    showlog
  },
  data() {
    return {};
  },
  mounted() {},
  computed: {},
  methods: {
    openLogin() {
      this.$store.dispatch("isShowLogin");
    },
    outlogin() {
      //退出逻辑
      this.$router.push({
        path:'/'
      });
      localStorage.removeItem("uid");
      localStorage.removeItem("userName");
      setTimeout(()=>{
         window.location.reload();
      },500)
    }
  },
  mounted(){
    
  }
};
</script>

<style lang="scss">
#appnav {
  user-select:none;
  min-width: 1024px; /*no*/
  padding: 20px 0;
  background: #fff;
  box-shadow: 0px 1px #ddd;
  a {
    color: #333;
    font-size: 24px;
    margin-right: 80px;
    text-decoration: none;
    &.router-link-exact-active {
      color: #ff3030;
      position: relative;
    }
    &.router-link-exact-active::after {
      content: "";
      position: absolute;
      width: 30px;
      height: 2px;
      bottom: -10px;
      left: 50%;
      margin-left: -15px;
      background: #ff3030;
      border-radius: 9999999999999px;
    }
  }
}
#appnav a:hover {
  color: #ff3030;
  position: relative;
}
#appnav a:hover:after {
  content: "";
  position: absolute;
  width: 30px;
  height: 2px;
  bottom: -10px;
  left: 50%;
  margin-left: -15px;
  background: #ff3030;
  border-radius: 9999999999999px;
}
.navwrap {
  min-width: 1024px; /*no*/
  width: 60vw;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  display: flex;
  justify-content: flex-start;
}
.loginBtn {
  text-align: right;
  position: absolute;
  right: 0px;
  top: 0;
  // width: 300px;
  height: 100%;
  // background: #eee;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 24px;
  // color:pink;
  cursor: pointer;
}
.el-dropdown span {
  color:#409EFF;
}
</style>