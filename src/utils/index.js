import {routerlinks} from '../config';
// 本地写数据
export function setStroageItem (key,value){
    localStorage.setItem(key,JSON.stringify(value));
}
// 本地读数据
export function getStroageItem (key){
   const data = localStorage.getItem(key);
         return JSON.parse(data);
}
// 本地删除某条数据
export function removeStroageItem (key){
        localStorage.removeItem(key)
}
// 本地数据清空
export function clearStroage (){
        localStorage.clear();
}  
// 匹配路径
export function matchPath(path){
     let {sidebar:{activekey:sidebarkey,list:sidebarlist},headerNav:{activekey:headerNavkey,list:headNavlist}}  =  routerlinks;
     let status = isWhoMath(path,sidebarlist);
         if(status.matched){
             setStroageItem(sidebarkey,status.index)
             setStroageItem(headerNavkey,0)
             return
         }
         status = isWhoMath(path,headNavlist);
         if(status.matched){
            setStroageItem(headerNavkey,status.index)
            return
        }
}
// 封装匹配函数
function isWhoMath(path,data){
    let  index = data.findIndex(item=> item.key===path);
    if(index<0){
        return {
            matched:false
        }
    }else{
       return {
           matched:true,
           index
       }
    }
}
// 根据tab来返回对应的state中的key
export function getStateKey(tab){
    switch (tab) {
        case "ask":
            return "getALLAskData"    
            break;   
        case "share":
            return "getAllShareData"    
            break;   
        case "good":
            return "getAllniceData"    
            break;   
        default:
            return "getAlltopicsData"
            break;
    }
}
// 时间处理
export function tackleTime(str,onlydate){
    let date = new Date(str);
    if(onlydate){
        return `${date.getFullYear()}-${add0(date.getMonth())}-${add0(date.getDate())}`
    }
    return `${date.getFullYear()}-${add0(date.getMonth())}-${add0(date.getDate())} ${add0(date.getHours())}:${add0(date.getMinutes())}:${add0(date.getSeconds())}`
}
// 保证时间数据为两位
function add0(num){
    return num.toString().length<2?'0'+num:num
}