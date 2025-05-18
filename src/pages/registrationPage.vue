<script setup>
import {useRegistration} from "../stores/user/registration.js";
import {useRouter} from "vue-router";
import {reactive, ref} from "vue";
import {useAuthorization} from "../stores/user/authorization.js";

const router = useRouter();
const isLoading = ref(false);

const registration = reactive({
    givenName: "",
    familyName: "",
    email: "",
    password: "",
    confirmPassword: ""
});

const handleRegistration = async () => {
    isLoading.value = true;

    try {

        await useRegistration().userRegistration({
            givenName: registration.givenName,
            familyName: registration.familyName,
            email: registration.email,
            password: registration.password
        });

        const authResponse = await useAuthorization().userAuth({
            email: registration.email,
            password: registration.password,
        });

        if(authResponse) {
            await router.push('/');
        }

    } catch (error) {
        console.error("Xatolik yuz berdi:", error.response?.data?.message || error.message);
        errorMessage.value = error.response?.data?.message || "Ro'yxatdan o'tishda xato yuz berdi";
    } finally {
        isLoading.value = false;
    }
};

</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md m-3">
            <h2 class="text-2xl font-bold text-center text-gray-700 mb-6">Ro'yxatdan o'tish</h2>

            <form @submit.prevent="handleRegistration">
                <div class="mb-4">
                    <label class="block text-gray-600 text-sm font-semibold mb-2">Ism</label>
                    <input
                        v-model="registration.givenName"
                        type="text"
                        class="w-full p-2 border border-gray-300 rounded"
                        placeholder="Ismingiz"
                    />
                </div>

                <div class="mb-4">
                    <label class="block text-gray-600 text-sm font-semibold mb-2">Familiya</label>
                    <input
                        v-model="registration.familyName"
                        type="text"
                        class="w-full p-2 border border-gray-300 rounded"
                        placeholder="Familyangiz"
                    />
                </div>

                <div class="mb-4">
                    <label class="block text-gray-600 text-sm font-semibold mb-2">Email</label>
                    <input
                        v-model="registration.email"
                        type="email"
                        class="w-full p-2 border border-gray-300 rounded"
                        placeholder="Emailingiz"
                    />
                </div>

                <div class="mb-4">
                    <label class="block text-gray-600 text-sm font-semibold mb-2">Parol</label>
                    <input
                        v-model="registration.password"
                        type="password"
                        class="w-full p-2 border border-gray-300 rounded"
                        placeholder="Parolingiz"
                    />
                </div>

                <div class="mb-6">
                    <label class="block text-gray-600 text-sm font-semibold mb-2">Parolni tasdiqlang</label>
                    <input
                        v-model="registration.confirmPassword"
                        type="password"
                        class="w-full p-2 border border-gray-300 rounded"
                        placeholder="Parolingizni qayta kiriting"
                    />
                </div>

                <div class="flex justify-end">
                    <button
                        type="submit"
                        :disabled="isLoading"
                        class="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition"
                    >
                        {{ isLoading ? 'Yuklanmoqda...' : 'Ro\'yxatdan o\'tish' }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<style scoped>

</style>
