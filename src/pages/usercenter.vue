<template>
    <div class="usercentr_wrap">
        <div class="user_header" >
            <img :src="datalist.avatar_url" alt="avatar" class="avatar">
            <div class="user_loginname">
                <Row type="flex" justify="center" align="middle">
                    <Col class="user_left" span="12">
                        用户名:
                    </Col>
                    <Col span="12">
                        {{datalist.loginname}}
                    </Col>
                </Row>
            </div>
            <div class="user_register_time">
                <Row>
                    <Col class="user_left" span="12">
                         注册于:
                    </Col>
                    <Col span="12">
                        {{datalist.create_at|dateTime}}
                    </Col>
                </Row>
            </div>
            <div class="user_score">
                <Row>
                    <Col class="user_left" span="12">
                         用户积分:
                    </Col>
                    <Col span="12">
                        {{datalist.score}}
                    </Col>
                </Row>
            </div>
        </div>
        <div class="user_new_content" :class="{active:!mycontentshow}">
            <div class="viewMore" @click="handleShowMore('mycontentshow')" v-show="mycontentshow&&mycontentHeightOK">
                点击查看更多
            </div>
            <div ref="mycontent">
                <Card style="padding:5px" v-if="datalist.recent_topics&&datalist.recent_topics.length" >
                    <span slot="title">创建话题</span>
                    <CellGroup>
                            <Cell v-for="(item,index) in datalist.recent_topics" :key="index" class="list_item" @click.native = "handleToDetail(item.id)" > 
                            <img @click.stop="handleToUser(item.author.loginname)" :src="item.author.avatar_url" alt="avatar" slot="icon" class="contet_avatar">
                            <div class="label" slot="label">
                                    <span class="title">{{item.title}}</span>
                                    <span class="des">最新回复:{{item.last_reply_at|time}}</span>
                            </div>
                            </Cell>  
                    </CellGroup>
                </Card>
                <Card style="padding:5px" v-else class="nodata">
                    <span slot="title">创建话题</span>
                    <span class="tip">尚未发表过内容</span>
                </Card>
            </div>
        </div>
        <div class="user_collect_content" :class="{active:!myreplyshow}">
            <div class="viewMore" @click="handleShowMore('myreplyshow')" v-show="myreplyshow&&myreplyHeightOK">
                点击查看更多
            </div>
            <div ref="myreply">
                <Card style="padding:5px" v-if="datalist.recent_replies&&datalist.recent_replies.length" >
                    <span slot="title">参与话题</span>
                    <CellGroup>
                            <Cell v-for="(item,index) in datalist.recent_replies" :key="index" class="list_item" @click.native = "handleToDetail(item.id)" > 
                            <img @click.stop="handleToUser(item.author.loginname)" :src="item.author.avatar_url" alt="avatar" slot="icon" class="contet_avatar">
                            <div class="label" slot="label">
                                    <span class="title">{{item.title}}</span>
                                    <span class="des">最新回复:{{item.last_reply_at|time}}</span>
                            </div>
                            </Cell>  
                    </CellGroup>
                </Card>
                <Card style="padding:5px" v-else class="nodata">
                    <span slot="title">参与话题</span>
                    <span class="tip">尚未回复过内容</span>
                </Card>
            </div>
        </div>
    </div>
</template>
<script>
import {mapActions} from 'vuex';
import {Row,Col,Card,CellGroup,Cell} from 'iview';
import {tackleTime} from '../utils';
export default {
    data(){
        return{
            mycontentshow:true,
            myreplyshow:true,
            mycontentHeightOK:false,
            myreplyHeightOK:false
        }
    },
    computed:{
        datalist(){
            return this.$store.state.getUserData;
        }
    },
    components:{
        Row,
        Col,
        Card,
        CellGroup,
        Cell
    },
    filters:{
        dateTime(str){
            return tackleTime(str,true)
        },
        time(str){
            return tackleTime(str)
        }
    },
    methods:{
        ...mapActions(['getUsersData']),
        handleToDetail(id){
            this.$router.push(`/detail/${id}`)
        },
        handleToUser(name){
            this.$router.push(`/users/${name}`)
        },
        handleShowMore(type){
            console.log(type);
            this[type] = false;
        },
        handleToggle(){
            // 获取两元素的高度
            this.$nextTick(()=>{
                if(this.$refs.myreply.getBoundingClientRect().height>300){
                    this.myreplyHeightOK = true;
                }
                if(this.$refs.mycontent.getBoundingClientRect().height>300){
                this.mycontentHeightOK = true;
                }
            })
            }
    },
    updated(){
        this.handleToggle()
    },
    created(){
        this.getUsersData(this.$route.params.name);
        // 获取两元素的高度
        this.handleToggle()
    },
    watch:{
        $route(to,from){
            if(to.path === from.path){
                return
            }
            this.getUsersData(this.$route.params.name)
            this.mycontentshow = true;
            this.myreplyshow = true;
        }
    }
}
</script>
<style lang="less" scoped>
    .usercentr_wrap{
        background-color: rgba(238, 238, 238, 0.267);
        padding: 10px 10px 30px;
        .user_header{
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px 10px 10px;
            &>div{
                width:100%;
                display: block;
            }
            .user_left{
                text-align: right;
                padding-right: 10px;
            }
            .avatar{
                display: block;
                width:50px;
                height: 50px;
                border-radius: 50%;
                box-shadow: 0 0 3px #999;
                margin-bottom: 10px;
            }
            border-bottom: 2px solid #fff;
        }
        .user_new_content,.user_collect_content{
            max-height: 300px;
            overflow: hidden;
            position: relative;
            &.active{
                overflow: none;
                max-height: none;
            }
            .viewMore{
                height: 30px;
                width: 100%;
                background: linear-gradient(to top,#eee 5%,transparent);
                position: absolute;
                left: 0;
                top:270px;
                line-height: 30px;
                text-align: center;
                z-index: 3;
                color: #2D8cF0;
            }
            .nodata .tip{
                display: block;
                width: 100%;
                text-align: center;
            }
            .ivu-cell-label{
                width: 100%;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                .title{
                    display: block;
                    width: 100%;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
            }
        }       
        .contet_avatar{
            display: block;
            width: 20px;
            height: 20px;
            border-radius: 3px;
        }
       .title{
            padding: 5px 15px;
            font-size: 14px;
            line-height: 1.2;
            color: rgb(85, 84, 84);
        }
        .des{
            font-size: 12px;
            line-height: 1.2;
            padding-left: 10px;
        }
        .label{
            display: flex;
            align-items: center;
        }
        .list_item+.list_item{
            border-top:1px solid rgba(221, 221, 221, 0.295);
        } 
        .list_item{
            padding: 5px 5px;
        } 
    @media screen and (max-width:576px){
            .label{
                display: inline-block;
                width: 100%;
                .des{
                    padding-left: 15px;
                }
                .title{
                    padding:5px;
                }
            } 
        }      
    }
</style>


