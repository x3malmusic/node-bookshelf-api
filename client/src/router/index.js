import Vue from "vue";
import VueRouter from "vue-router";
import http from "../http";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "auth",
    meta: { reqAuth: false },
    component: () => import("../views/Auth.vue"),
    children: [
      {
        path: "/",
        name: "register",
        meta: { reqAuth: false },
        component: () => import("../components/Register.vue"),
      },
      {
        path: "/login",
        name: "login",
        meta: { reqAuth: false },
        component: () => import("../components/Login.vue"),
      },
    ],
  },
  {
    path: "/user",
    name: "layout",
    meta: { reqAuth: true },
    component: () => import("../views/Header.vue"),
    children: [
      {
        path: "/posts",
        name: "posts",
        meta: { reqAuth: true },
        component: () => import("../views/Posts.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

// router.beforeEach(async (to, from, next) => {
//   const { reqAuth } = to.meta;
//   const user = await http.get("/users/getUser").catch((e) => {});
//
//   if (!reqAuth) {
//     if (user && user.data && user.data.loggedIn) {
//       return next({ name: "posts" });
//     } else {
//       return next();
//     }
//   } else if (reqAuth) {
//     if (user && user.data && user.data.loggedIn) {
//       return next();
//     } else {
//       return next({ name: "auth" });
//     }
//   }
// });

export default router;
