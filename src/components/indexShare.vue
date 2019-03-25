<template>
    <i-content :tab="tabKey"/>
</template>
<script>
import IndexContent from './indexcontent.vue';
export default {
    data(){
        return {
            tabKey:"share"
        }
    },
    components:{
        "i-content":IndexContent
    }
}
</script>
<style lang="less" scoped>

</style>
