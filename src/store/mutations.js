import {SHOWSPIN,HIDDENSPIN,GETTOPSALLDATA,GETDETAILDATA,GETUSERSDATA} from  './mutationTypes';
import {getStateKey} from '../utils';

export default {
    [SHOWSPIN](state){
        state.isshowspin = true;
    },
    [HIDDENSPIN](state){
        state.isshowspin = false;
    },
    [GETTOPSALLDATA](state,playload){
        let filterdata = playload.data.map(item=>{
            let {author,author_id,create_at,id,title} = item ;
            return ({author,author_id,create_at,id,title})
        })
        state[getStateKey(playload.tab)] = filterdata;
    },
    [GETDETAILDATA](state,playload){
            let {author,author_id,content,create_at,last_reply_at,reply_count,title,visit_count,replies} = playload ;
            let filterReply = replies.map(item=>{
                let {author,content,create_at,ups,id} = item;
                return {author,content,create_at,len:ups.length,id} 
            })
            state.getDetailData = {author,author_id,content,create_at,last_reply_at,reply_count,title,visit_count,filterReply}
    },   
    [GETUSERSDATA](state,playload){
        state.getUserData = playload;
    }   
}



