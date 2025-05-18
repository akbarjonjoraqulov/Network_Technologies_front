<script setup>
import {useRoute} from 'vue-router';
import {computed} from 'vue';
import DefaultLayout from './layouts/DefaultLayout.vue';

const route = useRoute();

const layout = computed(() => {
    return route.meta.layout || DefaultLayout;
});
</script>

<template>
    <component :is="layout">
        <router-view/>
    </component>
</template>
<style>

</style>
