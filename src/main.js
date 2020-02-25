import './assets/reset.css'
import './assets/common.css'
import Vue from 'vue'
import {
  Select,
  Option,
  Dialog,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Collapse,
  CollapseItem,
  Pagination,
  Button,
  Radio,
  Loading,
  TableColumn,
  TabPane,
  Table,
  Tabs,
  Divider,
  Upload,
  Tooltip,
  Message
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import ch from './common/lang/zh'
import en from './common/lang/en'
import ko from './common/lang/ko'
import ru from './common/lang/ru'
import ja from './common/lang/ja'
import VueI18n from 'vue-i18n'
import store from './store/index'
import Helper from './helpers/helper'
import RouterTools from './helpers/router'
import LineChart from './components/common/LineChart'

import Router from 'vue-router'

/**
 * Fixed compatibility issues with low version IE. lyx.
 */
import promise from 'es6-promise'
promise.polyfill();

const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Helper);
Vue.use(RouterTools);

Vue.component(Pagination.name, Pagination);
Vue.prototype.$message = Message;
Vue.use(Select)
Vue.use(Option)
Vue.use(Dialog)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Collapse)
Vue.use(Tooltip)
Vue.use(CollapseItem)
Vue.use(Button)
Vue.use(TableColumn)
Vue.use(TabPane)
Vue.use(Tabs)
Vue.use(Table)
Vue.use(Radio)
Vue.use(Loading)
Vue.use(Upload)
Vue.use(Divider)
Vue.component('line-chart', LineChart);

import echarts from 'echarts'
Vue.prototype.$echarts = echarts

/**
 * 全局组件注册
 */

import OntPagination from './components/common/OntPagination'
Vue.component('ont-pagination', OntPagination);

Vue.config.productionTip = false
const yuyan = navigator.language.split('-')[0]
let yuyans
switch (yuyan) {
  case 'zh':
    yuyans = 'ch'
    break
  case 'en':
    yuyans = 'en'
    break
  case 'ko':
    yuyans = 'ko'
    break
  case 'ru':
    yuyans = 'ru'
    break
  case 'ja':
    yuyans = 'ja'
    break
  default:
    yuyans = 'en'
}
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: localStorage.getItem('user_lang') || yuyans,
  messages: {
    ch: ch,
    ru: ru,
    ja: ja,
    en: en,
    ko: ko
  }
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
