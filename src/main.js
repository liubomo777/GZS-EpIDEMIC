import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import api from './api'
import '@/assets/css/element.scss'
import '@/assets/css/base.scss';
import globalComponent from '@/components/index.js'
import {message} from '@/utils/message'
import BaiduMap from 'vue-baidu-map-v3'
import * as echarts from 'echarts'
import VueClipBoard from 'vue-clipboard2'
import * as filters from './filters' // global filters
Vue.prototype.$echarts = echarts
import moment from 'moment'; //导入模块
import VueBus from 'vue-bus';

//全局过滤
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 全局
Vue.prototype.$message = message
moment.locale('zh-cn'); //设置语言 或 moment.lang('zh-cn');
Vue.prototype.$moment = moment;//赋值使用
Vue.use(globalComponent)
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueClipBoard)
Vue.prototype.api = api
Vue.use(VueBus);
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'wMHQILzWG1bGfdGbcMlAla4QjuIwhWfT'
})

//按钮节流
const preventReClick = Vue.directive('preventReClick', {
  inserted: function (el, binding) {
    el.addEventListener('click', () => {
      if (!el.disabled) {
        el.disabled = true
        setTimeout(() => {
          el.disabled = false
        }, binding.value || 2000)
      }
    })
  }
})
Vue.prototype.$preventReClick = preventReClick

router.beforeEach((to, from, next) => {
  if (to.path === '/personal') {
    store.commit('setPersonal', true)
    next()
  } else {
    store.commit('setPersonal', false)
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')



