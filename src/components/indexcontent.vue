<template>
    <div class="indexall_wrap">
        <i-card v-if="listData.length">
            <i-CellGroup>
                <i-Cell v-for="(item,index) in listData" :key="index" class="list_item" @click.native="handleClick(item.id)">
                        <div class="list_title">
                            {{item.title}}
                        </div>
                        <div class="list_icon" slot="icon">
                             <div class="avatar" @click.stop="handeToUsers(item.author.loginname)">
                                 <img :src="item.author.avatar_url" alt="avatar">
                             </div>
                        </div>
                        <div class="list-description" slot="label">
                             <div class="author_name">作者: {{item.author.loginname}}</div>
                             <div class="create_ti">发布于: {{item.create_at|time}}</div>
                             <div class="create_ti_date">发布于: {{item.create_at|timedate}}</div>
                        </div>
                </i-Cell>
            </i-CellGroup>
        </i-card>
        <div class="page_wrap" v-if="listData.length">
            <i-page :total="total" :current="pageNum" :page-size="pagesize" @on-change="handlepageChange" />
        </div>
        <i-nodata v-if="$store.state.isshowspin"/>
    </div>
</template>
<script>
import {Card,CellGroup,Cell,Page} from 'iview';
import NoData from './Nodata';
import {mapActions} from 'vuex';
import {getStateKey,tackleTime} from '../utils'
export default {
    data(){
        return {
            pageNum:1,
            pagesize:15,
            total:450,
            status:false
        }
    },
    props:["tab"],
    computed:{
        tabkey(){
            return this.tab
        },
        listData(){
            return this.$store.state[getStateKey(this.tabkey)]
        }
    },
    filters:{
        time(str){
            return tackleTime(str)
        },
        timedate(str){
            return tackleTime(str,true)
        }
    },
    components:{
        "i-card":Card,
        "i-CellGroup":CellGroup,
        "i-Cell":Cell,
        "i-page":Page,
        "i-nodata":NoData
    },
    methods:{
        handleClick(path){
            this.$router.push(`/detail/${path}`)
        },
        handeToUsers(name){
            this.$router.push(`/users/${name}`)
        },
        handlepageChange(pageNum){
            console.log(pageNum);
            this.pageNum = pageNum;
            this.getALLtops({
                pageNum,
                tab:this.tabkey
            })
        },
        ...mapActions(['getALLtops'])
    },
    created(){
         this.getALLtops({
                tab:this.tabkey
         })
         this.status = true;
    }   
}
</script>
<style lang="less" scoped>
    .indexall_wrap{
        width:100%;
        height: calc(~"100vh -" 50px);
        overflow: scroll;
        padding-bottom: 35px;
        .list_item+.list_item{
            border-top: 2px solid #eee;
        }
        .list-description{
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            .author_name{
                padding-right: 15px;
            }
        }
        @media screen and (max-width: 576px) {
                .create_ti{
                    display: none;
                }
                .ivu-page-item:hover{
                    border-color:#dcdee2!important;
                }
        }
        @media screen and (min-width: 576px) {
                .create_ti_date{
                    display: none;
                }
        }
        .list_icon{
            padding: 5px 10px;
            width: 50px;
            height: 50px;
            border-radius: 5px;
            box-shadow: 0 0 1px #eee;
            .avatar{
                padding: 5px 0 ;
                width: 100%;
                height: 100%;
            }
            img{
                display: block;
                width: 100%;
                height: 100%;
            }
        }
        .list_title{
            padding:5px 0;
            width: 90%;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
        .page_wrap{
            padding: 5px 0;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #fff;
            position: absolute;
            right: 0;
            bottom: 0;
            &::after{
                content: '';
                display: block;
                width:100%;
                height: 1px;
                background-color: #ddd;
                position: absolute;
                left: 0;
                top: 0;
                box-shadow: 0 0 3px #ddd;
            }
        }
    }
</style>