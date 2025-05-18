<template>
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/75"
         @click.self="closeModal" @keydown.esc="closeModal" tabindex="0">
        <div class="relative w-full max-w-4xl bg-white p-4 rounded-lg">
            <button @click="closeModal" class="absolute -top-10 right-0 text-white text-2xl hover:text-gray-300">
                &times;
            </button>

            <div v-if="loading" class="p-8 text-center animate-pulse">Video yuklanmoqda...</div>
            <div v-else-if="error" class="p-8 text-center text-red-500">{{ error }}</div>

            <template v-else>
                <video
                    ref="videoPlayer"
                    controls
                    autoplay
                    playsinline
                    class="w-full h-auto max-h-[80vh]"
                    @error="handleVideoError"
                    @loadeddata="loading = false"
                >
                    <source :src="currentVideo.fullContentUrl" :type="`video/${currentVideo.fileType}`">
                    Brauzeringiz videoni qo'llab-quvvatlamaydi
                </video>

                <div class="mt-2 p-2 bg-gray-100 rounded">
                    <h3 class="font-bold">{{ currentVideo.name }}</h3>
                    <p class="text-sm text-gray-600">
                        Format: {{ currentVideo.fileType.toUpperCase() }}
                    </p>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup>
import { ref, nextTick } from 'vue';

const isOpen = ref(false);
const currentVideo = ref(null);
const videoPlayer = ref(null);
const loading = ref(false);
const error = ref(null);

const handleVideoError = () => {
    error.value = 'Video yuklab bo\'lmadi';
    loading.value = false;
};

const openModal = (video) => {
    currentVideo.value = video;
    isOpen.value = true;
    loading.value = true;
    error.value = null;

    nextTick(() => {
        if (videoPlayer.value) {
            videoPlayer.value.load();
            videoPlayer.value.play().catch(e => {
                error.value = "Video avtomatik ijro etish bloklangan";
                loading.value = false;
            });
        }
    });
};

const closeModal = () => {
    isOpen.value = false;
    videoPlayer.value?.pause();
    currentVideo.value = null;
};

defineExpose({ openModal, closeModal });
</script>

<style scoped>

</style>