<template>
    <div class="about_wrap new_user_wrap">
        <Card v-for="(item,index) in listdata" :key="index">
            <p slot="title">{{item.title}}</p>
            <div class="new_user_content">
                <VueMarkdown :source="item.content"/>
            </div>
        </Card>
    </div>
</template>
<script>
import {Card} from 'iview';
import VueMarkdown from 'vue-markdown';
import data from '../assets/about.js';
export default {
    data(){
        return{
            listdata:data
        }
    },
    components:{
        Card,
        VueMarkdown
    }
}
</script>
<style lang="less" scoped>
    .new_user_wrap{
        padding: 15px;
    }
</style>