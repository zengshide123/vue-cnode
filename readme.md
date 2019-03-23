# vue-cnode

 tags: [vue,cnode]

## 1.环境调试

 - iview组件库 按需引入
```
    npm install babel-plugin-import --save-dev

    //babel.config.js
    {
    "plugins": [["import", {
        "libraryName": "iview",
        "libraryDirectory": "src/components"
    }]]
    }
    //main.js
    import 'iview/dist/styles/iview.css'
```
  - iview定制主题

    - 新建theme文件夹
    - 新建index.less
      ```
        // index.less
        @import '~iview/src/styles/index.less';

        ## 自定义样式变量
        @primary-color: #8c0776;

        //main.js
        import './theme/index.less';
      ```
      > 保证less版本在3一下,全局和局部iview只能选择一种
      
