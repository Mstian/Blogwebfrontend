import Vue from 'vue'
import VueRouter from 'vue-router'
import routeArr from './routeArr';
Vue.use(VueRouter)
const defaultRoutes = routeArr.routeArr
const staricRoutes = routeArr.staticArr;
let routes = [...defaultRoutes,...staricRoutes]
const router = new VueRouter({
  routes
})
export default router
