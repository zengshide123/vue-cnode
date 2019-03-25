<template>
    <div class="header_wrap">
        <div class="header_main">
            <i-row class-name="header_row" type="flex" align="middle">
                <i-col :xs="5" :sm="5" :md="4" :lg="4" class-name="header_logo">
                    <router-link to="/" exact @click="handleselected(0)">
                        <span @click="handleselected(0)">Cnode</span>
                    </router-link>
                </i-col>
                <i-col :xs="16" :sm="19" :md="7" :lg="7" class-name="header_search">
                    <i-input v-model="value" prefix="ios-search" placeholder="搜索..." />
                </i-col>
                <i-col :xs="3" :sm="0" :md="0" :lg="0" class-name="header_nav">
                        <div class="header_nav_icon" @click="handleToggle">
                            <span class="iconfont iconhanbaocaidanzhedie "></span>
                        </div>                    
                </i-col>
                <i-col :xs="0" :sm="0" :md="0" :lg="13" class-name="header_nav">
                        <i-menu mode="horizontal" :active-name="activename" @on-select="handleselected">
                            <i-menuitem v-for="(item,index) in navlist" :name="index" :key="item.key">
                                <router-link :to="item.key" exact>
                                    {{item.title}}
                                </router-link>
                            </i-menuitem>
                        </i-menu>
                </i-col>
            </i-row>
        </div>
        <i-row>
            <i-col :xs="24" :sm="0">
                    <transition  name="toggle">
                            <div class="head_nav_vertical"  v-if="isshow">
                                <i-menu mode="vertical" :active-name="activename" @on-select="handleselected">
                                    <template v-for="(item,index) in navlist" :name="index">
                                        <i-subitem :key="index" v-if="item.children" :name="index">
                                            <i-menuitem v-for="(item1,index1) in item.children.list" :name="index+'-'+index1" :key="item1.key">
                                                <router-link :to="item1.key" exact>
                                                                {{item1.title}}
                                                </router-link>
                                            </i-menuitem>
                                            <i-menuitem slot="title" :name="index">
                                                <router-link :to="item.key" exact>
                                                                {{item.title}}
                                                </router-link>
                                            </i-menuitem>
                                        </i-subitem>
                                        <template v-else>
                                            <i-menuitem :key="index" :name="index">
                                                <router-link :to="item.key" exact>
                                                    {{item.title}}
                                                </router-link>
                                            </i-menuitem>
                                        </template>
                                    </template>
                                </i-menu>
                            </div>
                    </transition >
            </i-col>
        </i-row>
    </div>
</template>
<script>
import {Row,Col,Input,Menu,MenuItem,Submenu } from 'iview';
import {setStroageItem,getStroageItem} from '../utils';
import {routerlinks} from '../config';
export default {
    data(){
        return {
            value:'',
            navlist:routerlinks.headerNav.list,
            activename:getStroageItem(routerlinks.headerNav.activekey),
            isshow:false
        }
    },
    components:{
        "i-row":Row,
        "i-col":Col,
        "i-input":Input,
        "i-menu":Menu,
        "i-menuitem":MenuItem,
        "i-subitem":Submenu
    },
    methods:{       
        handleselected(key){
            this.activename = key;
           setStroageItem(routerlinks.headerNav.activekey,key)        
        },
        handleToggle(){
            this.isshow = !this.isshow;
            this.$nextTick(()=>{
                if(this.isshow){
                    document.body.style = "overflow: hidden;height:100vh;touch-action: none"
                }else{
                   document.body.style = "" 
                }
            })
        }
    },
    watch: {
    '$route' (to, from) {
           this.activename = getStroageItem(routerlinks.headerNav.activekey);
           this.isshow = false; 
           this.$nextTick(()=>{
                   document.body.style = "" 
            })
        }
    }
}
</script>
<style lang="less" scoped>
    .header_wrap{
        width: 100%;
        position: relative;
        .header_main{
            background-color: #dcdee2;
        }
        .header_logo{
            text-align: center;
            padding: 5px 0;
            a{
                font-size: 20px;
                font-weight: bolder;
            }
        }
        .header_search{
            padding: 5px 15px 5px 0;
            max-width: 300px;           
        }
        .header_nav{
            .ivu-menu-horizontal{
                height: 50px;
                line-height: 50px;
            }
            .ivu-menu-light{
              background-color: transparent;
              padding-left: 20px;
              li{
                  margin: 0 15px;
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
            .header_nav_icon{
                text-align: center;
                background-color: #eee;
                width: 36px;
                border-radius: 5px;
                border:1px solid #666;
                &:hover{
                    border-color: #57a3f3;
                }
            }           

        }
        .toggle-enter-active, .toggle-leave-active {
            transition: height .5s;
            overflow: hidden;
        }
        .toggle-enter, .toggle-leave-to{
            height: 0;
        }
        .head_nav_vertical{
            position: fixed;
            width: 100vw;
            height:calc(~"100vh -"36px);
            background-color: rgba(0,0,0,.5);
            color: #fff;
            z-index: 5;
             transition: all .25s;
            .ivu-menu-vertical{
                width: 100%!important;
                color: #fff;
            }
            .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu){
                background-color: rgba(255,255,255,.5)
            }
            .ivu-menu-vertical .ivu-menu-item, .ivu-menu-vertical .ivu-menu-submenu-title{
                padding: 5px 0;
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
                      color: #fff;
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
    }
</style>


