<template>
    <div class="app_wrap">
        <i-header/>
            <transition name="myfade">
                <router-view></router-view>
            </transition>
        <div class="span_wrap" v-if="$store.isshowspin">
            <i-spin size="large" fix v-if="$store.isshowspin">
                <i-icon type="ios-loading" size=30 class="demo-spin-icon-load"></i-icon>
            </i-spin>
        </div>
    </div>
</template>
<script>
import Header from './components/header';
import  {Spin,Icon} from  'iview';
import {clearStroage} from './utils';
export default {
    data(){
        return {

        }
    },
    components:{
        "i-header":Header,
        "i-spin":Spin,
        "i-icon":Icon
    },
    methods:{

    },
    created(){
    },
    beforeDestroy(){
        clearStroage();
    }
}
</script>
<style lang="less">
    .span_wrap{
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        .demo-spin-icon-load{
            animation: ani-demo-spin 1s linear infinite;
        }
        @keyframes ani-demo-spin {
            from { transform: rotate(0deg);}
            50%  { transform: rotate(180deg);}
            to   { transform: rotate(360deg);}
        }
        .ivu-spin-fix{
            z-index: 1000;
            background-color:rgba(255,255,255,.3)
        }
    }
    .myfade-enter-active, .myfade-leave-active {
        transition: opacity .5s;
    }
    .myfade-enter, .myfade-leave-to {
        opacity: 0;
    }
</style>


