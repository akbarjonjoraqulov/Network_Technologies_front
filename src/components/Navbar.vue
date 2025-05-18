<script setup>
import router from "../plugins/router.js";
import {ref} from "vue";

function logOut() {
    localStorage.removeItem('token');
    router.push('/login');
}
function scrollToBottom() {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });
}
</script>
<template>
    <nav class="fixed top-0 left-0 right-0 z-50 bg-white shadow-md flex p-5 justify-between items-center">

        <div class="flex flex-col md:flex-row">
            <p class="text-3xl font-extrabold text-green-400">Network</p>
            <p class="text-3xl font-extrabold">Technologies</p>
        </div>

        <input type="checkbox" id="menuToggle" class="peer hidden">
        <label for="menuToggle" class="md:hidden text-3xl cursor-pointer">☰</label>

        <ul class="hidden peer-checked:flex md:flex flex-col md:flex-row gap-5 absolute md:static top-full left-0 w-full bg-white md:w-auto md:bg-transparent shadow-md md:shadow-none p-5 md:p-0">
            <li>
                <router-link to="/"
                             class="active:text-green-400">
                    Bosh Sahifa
                </router-link>
            </li>
            <li class="relative">
                <router-link to="/content"
                             class="active:text-green-400">Darslar
                </router-link>
            </li>
            <li @click="scrollToBottom()">
                Aloqa
            </li>
            <li @click="logOut()">Chiqish</li>
        </ul>
    </nav>
</template>

<style scoped>

</style>
