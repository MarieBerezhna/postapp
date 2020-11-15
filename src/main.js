import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import Axios from 'axios';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

Vue.prototype.$http = Axios;
const token = localStorage.getItem('token');
if (token) {
  Vue.prototype.$http.defaults.headers.common.Authorization = token;
}
Vue.config.productionTip = false;
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFacebookF, faLinkedinIn, faWhatsapp, faInstagram, faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

library.add(faFacebookF, faLinkedinIn, faWhatsapp, faInstagram, faGithub, faEdit );
Vue.component('font-awesome-icon', FontAwesomeIcon);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
