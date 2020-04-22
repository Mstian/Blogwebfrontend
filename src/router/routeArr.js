let routeArr = [ //默认路由
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue'),
        meta: {
            cn: '首页',
            show: true
        }
    },
    {
        path: '/study',
        name: 'study',
        component: () => import('../views/Study.vue'),
        meta: {
            cn: '学习',
            show: true
        }
    }, {
        path: '/tools',
        name: 'tools',
        component: () => import('../views/Tools.vue'),
        meta: {
            cn: '工具',
            show: true
        }
    }, {
        path: '/about',
        name: 'about',
        component: () => import('../views/About.vue'),
        meta: {
            cn: '关于',
            show: true
        }
    }
]
let dynamicArr = [ //模拟动态路由
    {
        path:'/center',
        name:'userenter',
        component:()=>import('../views/Center.vue'),
        meta:{
            cn:'个人中心',
            show:true
        }
    },
    {
        path:'*',
        redirect:'/404',
        meta:{
            cn:'*',
            show:false
        }
    }
]

let staticArr = [ //其他路由(不参与tab)
    {
        path: '/create',
        name: 'create',
        component: () => import('../views/Create.vue'),
    },{
        path: '/404',
        name: '404',
        component: () => import('../views/404.vue'),
        meta: {
            cn: '404',
            show: false
        }
    },{
        path:'/viewarticle',
        name:"viewarticle",
        component:()=>import('../views/ViewArticle'),
        meta: {
            cn: '文章详情',
            show: false
        }
    },{
        path:"/search",
        name:"搜索",
        component:()=>import('../views/Search.vue'),
        meta:{
            cn:"搜索页面",
            show:false
        }
    }
]

export default {
    routeArr,
    dynamicArr,
    staticArr
}