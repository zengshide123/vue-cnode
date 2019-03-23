import Vue from 'vue'
import VueRouter from 'vue-router'

// 使用vue-router插件
Vue.use(VueRouter)

// 实例化一个router
export default new VueRouter({
    mode:"history",
    routes:[
       { 
           path: '/', 
           component: ()=>import('../pages/home.vue')
        },
    ]
})
