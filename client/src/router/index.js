import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Auth",
    component: () => import("../views/Auth.vue")
  },
  {
    path: "/posts",
    name: "Posts",
    component: () => import("../views/Posts.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
