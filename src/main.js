import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '../src/assets/reset.css';
import 'lib-flexible';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "../src/assets/iconfont.css";
import footerpage from './components/footer';
Vue.component('footerpage', footerpage);
Vue.use(ElementUI);
Vue.config.productionTip = false
import routeArr from './router/routeArr';

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.use(mavonEditor)

router.beforeEach((to, from, next) => {
  let uid = localStorage.getItem('uid');
  let uname = localStorage.getItem('userName')
  if (uid) {
    if (!store.state.uid) {
      // console.log(to)
      store.commit('SETUID', uid);
      store.commit('SETUNAME', uname);
      store.dispatch('addRoutes', routeArr.dynamicArr).then(() => {
        next(to.fullPath)
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
