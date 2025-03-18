<script setup>

import Navbar from "../components/Navbar.vue";
</script>

<template>
    <div>
        <Navbar/>
        <div class="pt-[5rem] overflow-x-auto">

            <table class="min-w-full border border-gray-300 rounded-lg hidden md:table">
                <thead>
                <tr class="bg-green-500 text-white">
                    <th class="p-3 border-r border-gray-200">#</th>
                    <th class="p-3 border-r border-gray-200">Ism</th>
                    <th class="p-3 border-r border-gray-200">Familya</th>
                    <th class="p-3 border-r border-gray-200">Email</th>
                    <th class="p-3">Harakat</th>
                </tr>
                </thead>
                <tbody>
                <tr class="border-b border-gray-300">
                    <td class="p-3 border-r border-gray-200">1</td>
                    <td class="p-3 border-r border-gray-200">Akbarjon</td>
                    <td class="p-3 border-r border-gray-200">Jo‘raqulov</td>
                    <td class="p-3 border-r border-gray-200">akbarjon@example.com</td>
                    <td class="p-3">
                        <button class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">
                            O‘chirish
                        </button>
                    </td>
                </tr>
                <tr class="border-b border-gray-300">
                    <td class="p-3 border-r border-gray-200">2</td>
                    <td class="p-3 border-r border-gray-200">Javohir</td>
                    <td class="p-3 border-r border-gray-200">Abdullayev</td>
                    <td class="p-3 border-r border-gray-200">javohir@example.com</td>
                    <td class="p-3">
                        <button class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">
                            O‘chirish
                        </button>
                    </td>
                </tr>
                <tr class="border-b border-gray-300">
                    <td class="p-3 border-r border-gray-200">3</td>
                    <td class="p-3 border-r border-gray-200">Sanjar</td>
                    <td class="p-3 border-r border-gray-200">Karimov</td>
                    <td class="p-3 border-r border-gray-200">sanjar@example.com</td>
                    <td class="p-3">
                        <button class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">
                            O‘chirish
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="h-screen flex items-center justify-center">
            <p class="text-gray-600 text-lg md:hidden text-center">
                Ma’lumotlar mobil qurilmada mavjud emas
            </p>
        </div>
    </div>
</template>

<style scoped>

</style>