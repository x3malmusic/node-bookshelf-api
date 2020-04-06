import Vue from "vue";
import VueRouter from "vue-router";
import http from "../http";

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
    path: "/user",
    name: "layout",
    component: () => import("../views/Header.vue"),
    children: [
      {
        path: "/posts",
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
