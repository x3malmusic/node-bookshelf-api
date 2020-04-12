import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("../views/Auth.vue"),
    children: [
      {
        path: "/",
        name: "register",
        component: () => import("../components/Register.vue"),
      },
      {
        path: "/login",
        name: "login",
        component: () => import("../components/Login.vue"),
      },
    ],
  },
  {
    path: "/:userId",
    name: "layout",
    component: () => import("../views/Header.vue"),
    children: [
      {
        path: "posts",
        name: "posts",
        component: () => import("../views/Posts.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
