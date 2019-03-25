<template>
    <div class="detail_wrap">
        <Row>
            <Col :xs="24" :sm="{ span: 22, offset: 1 }" >
            <div class="header" v-if="dataList.author">
                <div class="header_title">
                    {{dataList.title}}
                </div>
                <div class="header_desc">
                    发布于: {{dataList.create_at|time}}  作者: {{dataList.author.loginname}}  {{dataList.visit_count}} 次浏览
                </div>
            </div>
            <div class="content markdown-body" v-if="dataList.author">
                <vue-markdown :source="dataList.content"/>
            </div>
            <div class="reply" v-if="dataList.author">
             <card dis-hover shadow v-if="dataList.reply_count" style="padding:5px;background:rgb(247, 253, 255)">
                    <p slot="title">
                        <Icon type="md-chatbubbles" size="20" />
                    </p> 
                    <p slot="extra">
                    {{dataList.reply_count}} 回复
                    </p>
                    <cell-group>
                        <cell class="reply_item" v-for="(item , index) in dataList.filterReply" :key="index" v-if="index>=startshowIndex&&index<=endshowIndex">
                            <div class="reply_item_label markdown-body" slot="label">
                                <vue-markdown :source="item.content"/>
                            </div>
                            <div class="reply_item_title">
                                <div class="reply_item_title_left">
                                    <img :src="item.author.avatar_url" alt="reply_avatar" @click.stop="handleToUser(item.author.loginname)">
                                    <span class="reply_author">{{item.author.loginname}}</span>
                                    <span class="reply_time">{{item.create_at|time}}</span>
                                </div>
                                <div class="reply_item_title_right">
                                    <Icon type="md-thumbs-up" size="16" />
                                    <span>{{item.len}}</span>
                                </div>
                            </div>
                        </cell>
                    </cell-group>
                    <div class="page_wrap">
                       <Page :total="totalreplies" :current="currentpage" @on-change="handlepagechange"/>
                    </div>
                </card>
                <card dis-hover shadow v-else style>
                    <div class="nobody_reply">
                        当前无人参与回复
                    </div>
                        </card>
                    </div>
                </Col>
        </Row>
    </div>
</template>
<script>
    import VueMarkdown from 'vue-markdown';
    import {Card,Icon,CellGroup,Cell,Row,Col,Page} from 'iview';
    import {mapActions} from 'vuex';
    import {tackleTime} from '../utils'
    export default {
        data(){
            return {
                currentpage:1
            }
        },
        computed:{
            dataList(){
                return this.$store.state.getDetailData
            },
            totalreplies(){
                 return  this.dataList.filterReply.length
            },
            endshowIndex(){
                return this.currentpage*10-1
            },
            startshowIndex(){
                return (this.currentpage-1)*10
            }
        },
        filters:{
            time(str){
                return tackleTime(str)
            }
        },
        components:{
            VueMarkdown,
            Card,
            Icon,
            CellGroup,
            Cell,
            Row,
            Col,
            Page
        },
        created(){
            this.getDetaildata(this.$route.params.id);
        },
        methods:{
            ...mapActions(['getDetaildata']),
            handlepagechange(pageNum){
                this.currentpage = pageNum;
            },
            handleToUser(name){
                this.$router.push(`/users/${name}`)
            }
        },
        watch:{
             '$route'(to, from) {
                    console.log(to,from);
             }
        }  
    }
</script>
<style lang="less" scoped>
    .detail_wrap{
        padding: 10px;
        background-color: #fff;
        .ivu-cell{
            background-color: #e6e4e42c;
            cursor:auto; 
            &:hover{
               background-color: #e6e4e42c; 
            }
        }
        .header{
            padding: 0px  10px 5px;
            text-align: center;
            border-bottom: 2px solid #dddddd;
            background-color: #fff;
            .header_title{
               font-size: 16px;
                padding: 10px 0 ;
            }
            .header_desc{
                font-size: 12px;
            } 
        }
        .content{
            padding: 15px;
        }
        .reply{
            .page_wrap{
                display: flex;
                align-items: center;
                justify-content:center;
                padding: 10px 0;
                background-color: #fff;
            }
            .nobody_reply{
                text-align: center;
                padding: 20px 0;
                .ivu-card-head{
                    display: none;
                }
            }
            border-top: 2px solid #ddd;
            .ivu-card-head p, .ivu-card-head-inner{
             color: rgb(128, 122, 122);
             }
             .reply_item{
                 border-bottom: 2px solid #fff;
             }
            .reply_item_title{
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-size: 14px;
                .reply_item_title_left{
                   display: flex;
                   align-items: center;  
                   img{
                       display: block;
                       width: 20px;
                       height: 20px;
                       border-radius: 3px;
                       cursor: pointer;
                   }
                   .reply_author{
                       padding: 0 10px;
                   }      
                }
                .reply_item_title_right{
                    display: flex;
                    align-items: center;
                    span{
                        padding-left: 5px;
                    }
                }
            }
        }
    }
</style>

