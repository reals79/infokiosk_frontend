import Vue from "vue";
import VueRouter from "vue-router";
import Search from "../views/Search.vue";
import Slideshow from "../views/Slideshow.vue";
import Employees from "../views/Employees.vue";
import Documents from "../views/Documents.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Search",
    component: Search
  },
  {
    path: "/slideshow",
    name: "Slideshow",
    component: Slideshow
  },
  {
    path: "/employees",
    name: "Employees",
    component: Employees
  },
  {
    path: "/documents",
    name: "Documents",
    component: Documents
  },
  { path: '*', component: Search }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
