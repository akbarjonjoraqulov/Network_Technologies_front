import { createRouter, createWebHistory } from 'vue-router';
import {defineAsyncComponent} from "vue";

const routes = [
    {
        path: '/main',
        component: () => import('../pages/mainPage.vue'),
        meta: {
            layout: defineAsyncComponent(() => import('../layouts/DefaultLayout.vue')),
        }
    },
    {
        path: '/login',
        component: () => import('../pages/loginPage.vue'),
        meta: {
            layout: defineAsyncComponent(() => import('../layouts/BlankLayout.vue')),
        }
    },
    {
        path:'/register',
        component: () => import('../pages/registrationPage.vue'),
        meta: {
            layout: defineAsyncComponent(() => import('../layouts/BlankLayout.vue')),
        }
    },
    {
      path: '/admin',
      component: () => import('../pages/adminPage.vue'),
        meta: {
            layout: defineAsyncComponent(() => import('../layouts/DefaultLayout.vue')),
        }
    },
    {
        path: '/content',
        component: () => import('../pages/contentPage.vue'),
        meta: {
            layout: defineAsyncComponent(() => import('../layouts/DefaultLayout.vue')),
        }
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
