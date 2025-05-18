<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { jwtDecode } from 'jwt-decode';

const router = useRouter();
const userInfo = ref(null);
const error = ref(null);
const isTokenExpired = ref(false);

const getUserInfoFromToken = async () => {
    error.value = null;
    userInfo.value = null;
    isTokenExpired.value = false;

    try {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error("Tizimga kirish talab qilinadi");
        }

        const decoded = jwtDecode(token);
        userInfo.value = decoded;
        console.log("Dekodlangan token:", decoded); // Token ma'lumotlarini ko'rish

        // Token muddati tekshirish
        if (decoded.exp && Date.now() >= decoded.exp * 1000) {
            isTokenExpired.value = true;
            throw new Error("Session tugadi. Qayta kiring");
        }

        // Admin huquqlarini tekshirish
        const hasAdminAccess = decoded.roles?.some(role =>
            role === 'ROLE_ADMIN' || role === 'ROLE_SUPER_ADMIN'
        );
        console.log("Admin huquqlari:", hasAdminAccess); // Debug uchun

        if (hasAdminAccess) {
            // Admin sahifasiga yo'naltirish
            await router.push('/admin'); // await qo'shildi
            console.log("Admin sahifasiga muvaffaqiyatli o'tildi");
            return; // Funktsiyani tugatish
        } else {
            throw new Error("Sizda admin huquqlari yo'q");
        }

    } catch (err) {
        console.error("Xato:", err);
        error.value = err.message;

        // Agar token yo'q yoki muddati tugagan bo'lsa, login sahifasiga yo'naltirish
        if (!localStorage.getItem('token') || isTokenExpired.value) {
            await router.push('/login');
        }
    }
};

</script>

<template>
    <footer id="footer" ref="bottom" class="bg-white mt-10">
        <div class="my-10 mx-4">
            <h2 class="flex flex-col sm:flex-row p-2 text-5xl font-bold items-center justify-center text-center w-full my-[5rem]">
                <p class="flex items-center">Yordam kerakmi?</p>
                <p class="text-green-400 sm:ml-2">Aloqa</p>
            </h2>

            <div class="flex flex-col sm:flex-row gap-3 mx-auto w-full max-w-xl m-4">
                <input
                    class="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder="Ismingiz"
                >
                <input
                    class="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder="Emailingiz"
                >
            </div>

            <div class="grid grid-cols-1 gap-4 w-full max-w-xl mx-auto">
                <input
                    class="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder="Mavzu"
                >
                <textarea
                    class="border border-gray-300 p-3 rounded-lg h-[8rem] focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder="Xabaringiz"
                ></textarea>

                <div class="flex justify-center">
                    <button
                        class="bg-green-400 rounded-3xl px-8 py-3 text-white hover:bg-green-500 transition-colors font-medium">
                        Habar yuborish
                    </button>
                </div>
            </div>
        </div>

        <div class="fixed top-110 z-50 right-0">
            <button
                @click="getUserInfoFromToken"
                class="bg-green-400 rounded-3xl px-8 py-3 text-white hover:bg-green-500 transition-colors font-medium"
            >
                Admin
            </button>
        </div>

        <div class="w-full bg-gray-50 h-12 flex items-center justify-center text-gray-500">
            &copy; 2025 Network Technologies. Barcha huquqlar himoyalangan!
        </div>

        <div>
            <div v-if="userInfo" class="mt-4 p-4 bg-gray-100 rounded">
                <h3 class="font-bold">Foydalanuvchi ma'lumotlari:</h3>
                <pre>{{ userInfo.roles }}</pre>
                <div v-if="userInfo.roles">salom</div>
                <p v-if="isTokenExpired" class="text-red-500">Diqqat! Token muddati tugagan!</p>
            </div>

            <div v-if="error" class="mt-4 p-4 bg-red-100 text-red-700 rounded">
                {{ error }}
            </div>
        </div>
    </footer>
</template>

<style scoped>

</style>
