<script setup>

</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100 ">
        <div class="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg mx-3">
            <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
            <form class="grid grid-row-3 gap-6">
                <input class="border border-gray-200 p-3 rounded-xl"
                       type="email" placeholder="Email" name="email" required/>
                <input class="border border-gray-200 p-3 rounded-xl"
                       type="password" placeholder="Password" name="password" required/>
                <div class="flex justify-end">
                    <button class="bg-blue-400 px-4 py-1 rounded-xl w-20 text-white hover:bg-blue-600 transition">
                        Kirish
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>

</style>
