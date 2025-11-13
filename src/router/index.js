import { createRouter, createWebHistory } from "vue-router";
import ContactBook from "@/views/ContactBook.vue";

const routes = [
  { path: "/", name: "contactbook", component: ContactBook },
  { path: "/add", name: "contact.add", component: () => import("@/views/ContactAdd.vue") },
  { path: "/contacts/:id", name: "contact.edit", component: () => import("@/views/ContactEdit.vue"), props: true },
  { path: "/:pathMatch(.*)*", name: "notfound", component: () => import("@/views/NotFound.vue") },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;