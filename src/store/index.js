import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router';
import routerArr from '../router/routeArr';
import { searchArticle } from "../api/request/article";
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    routes:routerArr.routeArr,
    uid:'',
    userName:'',
    isShowLogin:false,
    searchList:[]
  },
  mutations: {
    SHOWLOGIN(state){
      state.isShowLogin = !state.isShowLogin;
    },
    SETUID(state,uid){
      state.uid = uid;
    },
    SETUNAME(state,uname){
      state.userName = uname;
    },
    ADDROUTES(state,addrouter){
      router.addRoutes(addrouter);
      state.routes = state.routes.concat(addrouter);
    },
    SEARCHLIST(state,data){
      state.searchList = data;
    }
  },
  actions: {
    async addRoutes(context,addrouter){
      await context.commit('ADDROUTES',addrouter)
    },
    isShowLogin(context){
      context.commit("SHOWLOGIN");
    },
    getSearchList(context,data){
      searchArticle(data).then((data)=>{
        if(data.err == 0){
          context.commit("SEARCHLIST",data.data);
        }
      })
    }
  },
  modules: {
  }
})
