<template>
  <div id="app">
    <div class="wrap">
      <appnav />
      <div class="router-view">
        <transition name="fade-page" mode="out-in">
          <keep-alive :exclude="['Home','ViewArticle']">
            <router-view />
          </keep-alive>
        </transition>
      </div>
      <footerpage />
    </div>
  </div>
</template>
<script>
import appnav from "./components/nav";
import rightside from "./components/rightSide";
import routeArr from "../src/router/routeArr";

export default {
  
  components: {
    appnav,
    rightside,
   
  },
  created() {},
  mounted() {
    const script = document.createElement("script");
    script.src =
      "https://s4.cnzz.com/z_stat.php%3Fid%3D1278868797%26show%3Dpic1' type='text/javascript'%3E%3C/script%3E";
    script.language = "JavaScript";
    document.body.appendChild(script);
  },
  watch: {
    $route: {
      handler(to, from) {
        setTimeout(() => {
          if (window._czc) {
            let location = window.location;
            let contentUrl = location.pathname + location.hash;
            let refererUrl = "/";
            window._czc.push(["_trackPageview", contentUrl, refererUrl]);
            window._czc.push(["_setAutoPageview"], false);
          }
        }, 300);
      },
      immediate: true
    }
  }
};
</script>>

<style lang="scss">
// 主要颜色
/* 
#fff
#f8f8f8
#FF4500
*/
// ::-webkit-scrollbar {
//   display: none; /* Chrome Safari */
// }
#app {
  font-family: "微软雅黑";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #333;
  // background: #f8f8f8;
  box-sizing: border-box;
}
.fade-page-enter-active,
.fade-page-leave-active {
  transition: all 0.3s;
}
.fade-page-enter {
  opacity: 0.1;
  transform: translateY(-5px);
}
.fade-page-leave-to {
  opacity: 0.1;
  transform: translateY(-5px);
}
// .wrap{
//   background: #f8f8f8;
//   position: absolute;
// }
.router-view {
  width:65vw;
  margin: 0 auto;
  // background: #fff;
  margin-top: 10px;
  // min-height: 87vh;
  // height: calc(100vh - 140px);
  min-height: calc(100vh - 172px);
  min-width: 1024px; /* no */
}
::selection {
  background: #ff3030;
  color: #fff;
}

//
</style>
