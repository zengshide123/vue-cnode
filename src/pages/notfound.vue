<template>
    <div class="notfound_wrap">
        <div class="title">404 页面没有找到</div>
        <div class="goback">
            <button @click="handleToIndex">回到首页</button>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{}
    },
    methods:{
        handleToIndex(){
            this.$router.push('/')
        }
    }    
}
</script>
<style lang="less" scoped>
    .notfound_wrap{
        width: 100%;
        position: relative;
        height: calc(~"100vh -"43px);
        background-color: #eee;
        display: flex;
        flex-direction: column;
        justify-content: center;
        color: #2D8cF0;
        text-align: center;
        .title{
            font-size: 20px;
            padding-bottom: 20px;
        }
        .goback{
            display: inline-block;
            button{
                padding: 5px 10px;
                border: 1px solid #2D8cF0;
                border-radius: 5px;
                color: #2D8cF0;
            }
        }
    }
</style>



