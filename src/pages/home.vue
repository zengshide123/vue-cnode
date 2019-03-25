<template>
    <div class="home_wrap">
        <i-row type="flex">
            <i-col :xs="0" :sm="5" :md="4">
                <div class="home_sideBar">
                    <i-menu mode="vertical" :active-name="sidebarActiveName" @on-select="handleselected">
                        <i-menuitem v-for="(item,index) in sidebarlist" :name="index" :key="item.key">
                            <router-link :to="item.key" exact>
                                            {{item.title}}
                            </router-link>
                            </i-menuitem>
                    </i-menu>  
                </div>
            </i-col>
            <i-col :xs="24" :sm="19" :md="20">
                <div class="home_content">
                    <transition name="fade">
                        <router-view></router-view>    
                    </transition>
                </div>
            </i-col>
        </i-row>
    </div>
</template>
<script>
import {Row,Col,Menu,MenuItem} from 'iview';
import {setStroageItem,getStroageItem} from '../utils';
import {routerlinks} from '../config';
export default {
    data(){
        return{
            sidebarlist:routerlinks.sidebar.list,
            sidebarActiveName:getStroageItem(routerlinks.sidebar.activekey)
        }
    },
    components:{
        'i-row':Row,
        'i-col':Col,
        "i-menu":Menu,
        "i-menuitem":MenuItem
    },
    methods:{
        handleselected(key){
            this.sidebarActiveName = key;
            setStroageItem(routerlinks.sidebar.activekey,key)
        }
    },
    watch: {
    '$route' (to, from) {
           this.sidebarActiveName = getStroageItem(routerlinks.sidebar.activekey);
        }
    }
}
</script>
<style lang="less" scoped>
    .home_wrap{
       height: calc(~"100vh -" 50px);
       background-color: #eee;
       overflow: hidden;
       .home_content{
         position: relative;
       }
       .home_sideBar{
           height: calc(~"100vh -" 50px);
            .ivu-menu-vertical{
                width: 100%!important;
                background-color: #eee!important;
                height: 100%;
            }
            .ivu-menu-light{
                background-color: transparent;
                text-align: center;
                .ivu-menu-item{
                    line-height: 1.6em;
                    padding: 10px 0 ;
                }
              li{
                  a{
                      color: #999;
                      font-size: 16px;
                      width: 100%;
                      display: block;
                      &:hover,&.router-link-active{
                          color: #57a3f3;
                          font-weight: bold;
                      }
                  }
              }
        }
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .6s;
    }
    .fade-enter, .fade-leave-to{
        opacity: 0;
    }
    }

</style>


