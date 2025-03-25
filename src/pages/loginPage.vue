<script setup>
import {reactive, ref} from "vue";
import axios from "axios";

let isLoading = ref(false);
let authorization = reactive({
    email: "",
    password: "",
})

function auth() {
    isLoading.value = true;
    axios.post("http://localhost:8086/api/users/auth", authorization)
        .then((res) => {
            console.log("Token olindi!")
            localStorage.setItem("token", res.data.token)
        })
}
</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100 ">
        <div class="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg mx-3">
            <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
            <form class="grid grid-row-3 gap-6" @submit.prevent="auth">
                <input class="border border-gray-200 p-3 rounded-xl"
                       type="email" placeholder="Email" name="email"
                       v-model="authorization.email" required />
                <input class="border border-gray-200 p-3 rounded-xl"
                       type="password" placeholder="Password" name="password"
                       v-model="authorization.password" required />
                <div class="flex justify-end">
                    <button class="bg-blue-500 px-4 py-2 rounded-xl w-24 text-white hover:bg-blue-600 transition
                        disabled:opacity-50 disabled:cursor-not-allowed"
                            :disabled="isLoading">
                        Kirish
                    </button>
                </div>
                <p class="text-center text-gray-500 text-sm mt-4">
                    Akkauntingiz yo‘qmi? ->
                    <router-link to="/register" class="text-blue-500 hover:underline">Ro‘yxatdan o‘tish</router-link>
                </p>
            </form>
        </div>
    </div>
</template>

<style scoped>

</style>
