# vue-cnode

    主要使用vue全家桶和iview来展示cnode

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
      > 保证less版本在3以下,全局和局部iview只能选择一种

  - 因为在组件中使用了局部引入iview,导致在封装请求时无法直接调用iview的组件api,选择以组件结合状态管理来替代

  - 使用less做预编译,导致clac计算出错.使用calc(~"100% -"100px),来避免错误解析语法。

## 2.开发

  - 使用一屏显示布局
  - 考虑到响应式,在布局空间过小时，将nav和sidebar全部放入toggle中
  - 使用config来定义一些数据配置
  - 考虑到返回数据有md的文件,使用相应的vue-markdown进行了处理。然而效果不如意,引入了github的md.css文件,自身在定义了一些样式。
  - 关于打包部署github pages的一点小改动,需要在vue.config.js配置。
  ```
    module.exports = {
            publicPath: process.env.NODE_ENV === 'production'
            ? './'
            : '/',
        }
  ```
  
## 3.项目地址

>    [vue-cnode](https://zengshide123.github.io/display-cnode/)

     移动端二维码地址:

![移动端二维码](https://github.com/zengshide123/vue-cnode/blob/master/link.png)

    




      
