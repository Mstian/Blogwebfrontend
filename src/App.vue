<template>
  <div id="app">
    <div class="wrap">
      <appnav />
      <div class="router-view">
        <transition name="fade-page" mode="out-in">
          <keep-alive>
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
    rightside
  },
  created() {}
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
  width: 60vw;
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
