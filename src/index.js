import Vue from 'vue';
import Element from 'element-ui';
import App from './App';
import router from './router';
import store from './store';
import '@/components/icon-svg';
import '@/components/dynamic-form';
import Clipboard from 'clipboard';
import vPinyin from '@/utils/vue_py';
import axios from 'axios'
import qs from 'qs'
import Blob from './excel/Blob.js'
import Export2Excel from './excel/Export2Excel.js'

Vue.prototype.$qs = qs;
Vue.use(Element);
axios.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded';
Vue.prototype.$http=axios
Vue.prototype.Clipboard=Clipboard;
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
