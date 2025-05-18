import { createRouter, createWebHistory } from 'vue-router';
import {defineAsyncComponent} from "vue";
import {jwtDecode} from "jwt-decode";

const checkTokenExpired = (token) => {
    if (!token) return true;

    try {
        const { exp } = jwtDecode(token);
        return Date.now() >= exp * 1000;
    } catch {
        return true;
    }
};
const ifAuthorized = (to, from, next) => {
    const token = localStorage.getItem('token');

    if (token && !checkTokenExpired(token)) {
        next(); // Token yaroqli
    } else {
        localStorage.removeItem('token'); // Muddat o'tgan tokenni o'chirish
        next('/login'); // Login sahifasiga yo'naltirish
    }
};

const ifNotAuthorized = (to, from, next) => {
    const token = localStorage.getItem('token');
    if (!token || token === 'null' || token === 'undefined') {
        next();
    } else {
        next('/');
    }
};

const routes = [
    {
        path: '/register',
        component: () => import('../pages/registrationPage.vue'),
        meta: {
            layout: defineAsyncComponent(() => import('../layouts/BlankLayout.vue'))
        },
        beforeEnter: ifNotAuthorized
    },
    {
        path: '/login',
        component: () => import('../pages/loginPage.vue'),
        meta: {
            layout: defineAsyncComponent(() => import('../layouts/BlankLayout.vue')),
        },
        beforeEnter: ifNotAuthorized
    },
    {
        path: '/',
        component: () => import('../pages/mainPage.vue'),
        meta: {
            layout: defineAsyncComponent(() => import('../layouts/DefaultLayout.vue')),
        },
        beforeEnter: ifAuthorized
    },
    {
        path: '/content',
        component: () => import('../pages/contentPage.vue'),
        meta: {
            layout: defineAsyncComponent(() => import('../layouts/DefaultLayout.vue')),
        },
        beforeEnter: ifAuthorized
    },
    {
        path: '/admin',
        component: () => import('../pages/adminPage.vue'),
        meta: {
            layout: defineAsyncComponent(() => import('../layouts/DefaultLayout.vue')),
        },
    },
    {
        path: '/darslik',
        component: () => import('../pages/darsliklarPage.vue'),
        meta: {
            layout: defineAsyncComponent(() => import('../layouts/BlankLayout.vue')),
        },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
