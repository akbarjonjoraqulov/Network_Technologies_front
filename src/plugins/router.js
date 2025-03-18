import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/main',
        component: () => import('../pages/mainPage.vue'),
    },
    {
        path: '/login',
        component: () => import('../pages/loginPage.vue'),
    },
    {
        path:'/register',
        component: () => import('../pages/registrationPage.vue'),
    },
    {
      path: '/admin',
      component: () => import('../pages/adminPage.vue'),
    },
    {
        path: '/content',
        component: () => import('../pages/contentPage.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
