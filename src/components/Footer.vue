<script setup>

</script>

<template>
    <div>
        <div class="my-10 mx-4">
            <h2
                class="flex flex-col sm:flex-row p-2 text-5xl font-bold items-center justify-center text-center w-full my-[5rem]"
            >
                <p class="flex items-center">Yordam kerakmi?</p>
                <p class="text-green-400 sm:ml-2">Aloqa</p>
            </h2>
            <div class="flex flex-col sm:flex-row gap-3 mx-auto w-full max-w-xl m-4">
                <input class="border border-gray-400 p-2 rounded w-full" placeholder="Ismingiz">
                <input class="border border-gray-400 p-2 rounded w-full" placeholder="Emailingiz">
            </div>
            <div class="grid grid-cols-1 gap-4 w-full max-w-xl mx-auto">
                <input class="border border-gray-400 p-2 rounded" placeholder="Mavzu">
                <textarea class="border border-gray-400 p-2 rounded h-[8rem]" placeholder="Xabaringiz"></textarea>

                <div class="flex justify-center">
                    <button class="bg-green-400 rounded-3xl px-6 py-2 text-gray-100 hover:bg-green-500 transition">
                        Habar yuborish
                    </button>
                </div>
            </div>
        </div>
        <div class="w-full bg-gray-50 h-12">
        </div>
    </div>
</template>

<style scoped>

</style>