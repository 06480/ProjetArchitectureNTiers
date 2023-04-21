import { createRouter as createVueRouter, createWebHashHistory, Router } from "vue-router";
import Home from "../views/Home.vue";
import Beers from "../views/Beers.vue";
import Breweries from "../views/Breweries.vue";
import Profile from "../views/Profile.vue";
import { createAuthGuard } from "@auth0/auth0-vue";
import { App } from 'vue';

export function createRouter(app: App): Router {
  return createVueRouter({
    routes: [
      {
        path: "/",
        name: "home",
        component: Home
      },
      {
        path: "/beers",
        name: "beers",
        component: Beers
      },
      {
        path: "/breweries",
        name: "breweries",
        component: Breweries
      },
      {
        path: "/profile",
        name: "profile",
        component: Profile,
        beforeEnter: createAuthGuard(app)
      }
    ],
    history: createWebHashHistory()
  })
}
