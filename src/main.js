import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {matchPath} from './utils';
// es api兼容
import "babel-polyfill";

// 定制主题
import './theme/index.less';

// iconfont
import './theme/iconfont/iconfont.css';

import './utils/axios';

router.beforeEach((to, from, next) => {
    matchPath(to.path);
    next();
  })

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
