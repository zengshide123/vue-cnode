import Vue from 'vue'
import VueRouter from 'vue-router'

// 使用vue-router插件
Vue.use(VueRouter)

// 实例化一个router
export default new VueRouter({
    mode:"hash",
    routes:[
       { 
           path: '/', 
           component: ()=>import('../pages/home.vue'),
           redirect: '/index/all',
           children:[
            { 
                path: '/index/all', 
                component: ()=>import('../components/indexAll.vue')
             },
            { 
                path: '/index/nice', 
                component: ()=>import('../components/indexnice.vue')
             },
            { 
                path: '/index/share', 
                component: ()=>import('../components/indexShare.vue')
             },
            { 
                path: '/index/ask', 
                component: ()=>import('../components/indexAsk.vue')
             }
           ]
        },
       { 
           path: '/about', 
           component: ()=>import('../pages/about.vue')
        },
       { 
           path: '/new_usage', 
           component: ()=>import('../pages/newUsage.vue')
        },
       { 
           path: '/detail/:id', 
           component: ()=>import('../pages/detail.vue')
        },
       { 
           path: '/users/:name', 
           component: ()=>import('../pages/usercenter.vue')
        },
       { 
           path: '*', 
           component: ()=>import('../pages/notfound.vue')
        },
    ]
})
