import Vue from "vue";
import Vuesax from "vuesax";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "vuesax/dist/vuesax.css";
import "./main.css";
import { Notifications } from "./services/notifications";

Vue.use(Vuesax);
Vue.config.productionTip = false;

Vue.mixin(Notifications);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
