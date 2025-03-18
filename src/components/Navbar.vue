<script setup>

</script>

<template>
    <nav class="fixed top-0 left-0 right-0 z-50 bg-white shadow-md flex p-5 justify-between items-center">
        <div class="flex flex-col md:flex-row">
            <p class="text-3xl font-extrabold text-green-400">Network</p>
            <p class="text-3xl font-extrabold">Technologies</p>
        </div>

        <!-- Mobil menyuni ochish tugmasi -->
        <input type="checkbox" id="menuToggle" class="peer hidden">
        <label for="menuToggle" class="md:hidden text-3xl cursor-pointer">☰</label>

        <!-- Menyu -->
        <ul class="hidden peer-checked:flex md:flex flex-col md:flex-row gap-5 absolute md:static top-full left-0 w-full bg-white md:w-auto md:bg-transparent shadow-md md:shadow-none p-5 md:p-0">
            <li>Bosh Sahifa</li>
            <li class="relative">
                <input type="checkbox" id="dropdownToggle" class="peer hidden">
                <label for="dropdownToggle" class="flex items-center gap-2 cursor-pointer text-green-400">
                    Darslar
                    <svg class="w-4 h-4 transition-transform peer-checked:rotate-180"
                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M19 9l-7 7-7-7"/>
                    </svg>
                </label>
                <div class="absolute mt-2 w-40 bg-gray-50 border border-gray-300 rounded-lg shadow-lg hidden peer-checked:block">
                    <a href="#" class="block px-4 py-2 hover:bg-gray-200">Video 1</a>
                    <a href="#" class="block px-4 py-2 hover:bg-gray-200">Video 2</a>
                    <a href="#" class="block px-4 py-2 hover:bg-gray-200">Video 3</a>
                    <a href="#" class="block px-4 py-2 hover:bg-gray-200">Video 4</a>
                </div>
            </li>
            <li>Aloqa</li>
            <li>Chiqish</li>
        </ul>
    </nav>

</template>

<style scoped>

</style>