import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VeeValidate from "vee-validate";

import "./lib/hotcss/hotcss.js";
import 'mint-ui/lib/style.css';
import './plugins/element.js'
Vue.config.productionTip = false;

Vue.use(VeeValidate);

// router.beforeEach((to,from,next)=>{
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
