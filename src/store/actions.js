import {GETTOPSALLDATA,SHOWSPIN,HIDDENSPIN,GETDETAILDATA,GETUSERSDATA} from './mutationTypes';
import axios from '../utils/axios';
export default {
    async getALLtops(context,palyload){
        let data = [];
        try {
            context.commit(HIDDENSPIN)
            data = await  axios('/topics',{
                   limit:15,
                   page:palyload.pageNum||1,
                   tab:palyload.tab
           })         
           context.commit(GETTOPSALLDATA,{
            data,
            tab:palyload.tab
        })
        } catch (error) {
            context.commit(SHOWSPIN)
        }
    },
    async getDetaildata(context,palyload){
        let data = [];
        try {
            context.commit(HIDDENSPIN)
            data = await  axios(`/topic/${palyload}`)
            context.commit(GETDETAILDATA,data)
        } catch (error) {
            context.commit(SHOWSPIN)
        }
    },
    async getUsersData(context,palyload){
        let personalData = [];
           try {
             context.commit(HIDDENSPIN)
             personalData = await axios(`/user/${palyload}`)
             context.commit(GETUSERSDATA,personalData)
           } catch (error) {
             context.commit(SHOWSPIN)
           }

    }
}