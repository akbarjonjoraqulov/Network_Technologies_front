<script setup>

</script>

<template>
    <div class="h-[40rem] bg-gray-100 mt-20">
        <div class=" flex items-center pl-10 md:pl-20 w-1/2 h-full">
            <div class="space-y-6">
                <h1 class="text-5xl font-bold">Sayt haqida Ma'lumot</h1>
                <p class="text-gray-400">added 30 packages, and audited 31 packages in 7s
                    4 packages are looking for funding
                    run `npm fund` for details
                    found 0 vulnerabilities
                </p>
                <router-link to="/content">
                    <button class="bg-green-400 rounded-3xl px-4 py-2 text-gray-100">
                        Darslarni ko'rish
                    </button>
                </router-link>
            </div>
        </div>
    </div>
    <router-view/>
</template>

<style scoped>

</style>