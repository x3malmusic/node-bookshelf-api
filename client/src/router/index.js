import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "auth",
    component: () => import("../views/Auth.vue")
  },
  {
    path: "/user",
    name: "layout",
    component: () => import("../views/Header.vue"),
    children: [
      {
        path: "/posts",
        name: "posts",
        component: () => import("../views/Posts.vue")
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
