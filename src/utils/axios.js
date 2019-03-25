import {baseURL} from '../config';
import axios from 'axios';
import  {SHOWSPIN,HIDDENSPIN} from '../store';

// axios添加全局默认属性配置
axios.defaults.baseURL = baseURL;
axios.defaults.timeout = 3000;

// 添加请求拦截器
axios.interceptors.request.use((config)=> {
    document.getElementById('loading').style.display = 'flex';
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use((response)=> {
    // 对响应数据做点什么
    document.getElementById('loading').style.display = 'none';
    return response;
  }, function (error) {
    // 对响应错误做点什么
    document.getElementById('loading').style.display = 'none';
    return Promise.reject(error);
  });


 export default function(url,params){
      return new Promise((resolve,reject)=>{
            axios.get(url,{params}).then((res)=>{
                if(res.status===200){
                    resolve(res.data.data)
                }else{
                    reject("请求出错")
                }     
            }).catch((err)=>{
                reject(err)
            })     
      })
  }


