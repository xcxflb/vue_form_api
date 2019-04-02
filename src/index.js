import Vue from 'vue';
import Element from 'element-ui';
import App from './App';
import router from './router';
import store from './store';
import '@/components/icon-svg';
import '@/components/dynamic-form';
import vPinyin from '@/utils/vue_py'
import axios from 'axios'
import qs from 'qs'


Vue.prototype.$qs = qs;
Vue.use(Element);
axios.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded';
Vue.prototype.$http=axios

Vue.config.productionTip = false;
Vue.filter('pinyin', function (val) {
  return vPinyin.chineseToPinYin(val);
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
