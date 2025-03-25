<script setup>

</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md m-3">
            <h2 class="text-2xl font-bold text-center text-gray-700 mb-6">Ro‘yxatdan o‘tish</h2>
            <form>
                <div class="mb-4">
                    <label class="block text-gray-600 text-sm font-semibold mb-2">Ism</label>
                    <input type="text" class="w-full p-2 border border-gray-300 rounded" placeholder="Ismingiz"
                           required/>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-600 text-sm font-semibold mb-2">Familya</label>
                    <input type="text" class="w-full p-2 border border-gray-300 rounded" placeholder="Familyangiz"
                           required/>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-600 text-sm font-semibold mb-2">Email</label>
                    <input type="email" class="w-full p-2 border border-gray-300 rounded"
                           placeholder="Emailingiz" required/>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-600 text-sm font-semibold mb-2">Parol</label>
                    <input type="password" class="w-full p-2 border border-gray-300 rounded"
                           placeholder="Parolingiz" required/>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-600 text-sm font-semibold mb-2">Parolni tasdiqlang</label>
                    <input type="password" class="w-full p-2 border border-gray-300 rounded"
                           placeholder="Parolingiz" required/>
                </div>
                <div class="flex justify-end">
                    <button type="submit"
                            class=" bg-blue-400 text-white py-1 px-3 rounded-xl hover:bg-blue-600 transition">
                        sign up
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<style scoped>

</style>
