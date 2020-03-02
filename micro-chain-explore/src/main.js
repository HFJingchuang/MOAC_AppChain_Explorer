// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import App from './App'
import router from './router'
import * as filters from './filters';
import { browser } from "./js/utils"
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
const Vue = window.Vue;
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false

Vue.prototype.$axios = window.axios;
Vue.prototype.$echarts = window.echarts;
window.axios.defaults.baseURL = '/api';
Vue.use(window.VueI18n);

var local = localStorage.getItem('languageType');
if (!local || local === "") {
  local = (browser.language.substr(0, 2)) === 'zh' ? 'zh' : 'en';
  localStorage.setItem('languageType', local);
}

const messages = {
  en: {
    message: require('./common/lang/en-US'),
    ...enLocale
  },
  zh: {
    message: require('./common/lang/zh-CN'),
    ...zhLocale
  }
}

const i18n = new window.VueI18n({
  locale: local,
  messages
})

Vue.use(window.ELEMENT, {
  i18n: (key, value) => i18n.t(key, value)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  components: { App },
  template: '<App/>'
})
