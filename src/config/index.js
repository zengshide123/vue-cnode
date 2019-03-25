// 路由跳转路径配置
export const routerlinks = {
      sidebar:{
          activekey:"sidebarActiveName",
          list:[
                {key:'/index/all',title:'全部',},
                {key:'/index/nice',title:'精华'},
                {key:'/index/share',title:'分享'},
                {key:'/index/ask',title:'问答'}
            ]       
      },
      headerNav:{
            activekey:"navActiveName",
            list:[
                {
                    key:'/',title:"首页",
                    children:{
                        activekey:"sidebarActiveName",
                        list:[
                              {key:'/index/all',title:'全部',},
                              {key:'/index/nice',title:'精华'},
                              {key:'/index/share',title:'分享'},
                              {key:'/index/ask',title:'问答'}
                          ] 
                    }           
            },
                {key:'/new_usage',title:"新手入门"},
                {key:'/about',title:"关于"},
            ]
      }
}
;
export const baseURL = 'https://cnodejs.org/api/v1';

