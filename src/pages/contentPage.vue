<template>
    <div class="px-4 py-32 md:py-24">
        <h1 class="text-lg font-semibold mb-3">Media obyektlar</h1>

        <div v-if="isLoading" class="text-gray-500 py-2">Yuklanmoqda...</div>

        <div v-else-if="error" class="text-red-500 py-2">{{ error }}</div>

        <div v-else>
            <table class="w-full border-collapse">
                <thead>
                <tr class="bg-gray-100">
                    <th class="border p-2 text-left">No</th>
                    <th class="border p-2 text-left">Nomi</th>
                </tr>
                </thead>
                <tbody>
                <tr
                    v-for="(item, index) in contents"
                    :key="item.contentUrl"
                    class="hover:bg-gray-50 cursor-pointer"
                    @click="openVideo(item.contentUrl)"
                >
                    <td class="border p-2">{{ index + 1 }}</td>
                    <td class="border p-2">{{ item.name }}</td>
                </tr>
                </tbody>
            </table>
            <div class="mt-2 text-sm text-gray-600">Jami: {{ store.state.totalItems }} ta</div>
        </div>

        <!-- Video modal oynasi -->
        <div v-if="showVideoModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white p-4 rounded-lg w-full max-w-2xl">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-medium">{{ currentVideoTitle }}</h3>
                    <button @click="closeVideo" class="text-gray-500 hover:text-gray-700">
                        &times;
                    </button>
                </div>
                <video controls autoplay class="w-full" v-if="currentVideoUrl">
                    <source :src="currentVideoUrl" :type="videoType">
                    Sizning brauzeringiz video formatini qo'llab-quvvatlamaydi.
                </video>
                <div v-if="videoError" class="text-red-500 p-2">
                    {{ videoError }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useFetchContents } from "../stores/content/getContent";

const store = useFetchContents();
const contents = computed(() => store.state.content);

// Video modal uchun state
const showVideoModal = ref(false);
const currentVideoUrl = ref('');
const currentVideoTitle = ref('');
const videoType = ref('');
const videoError = ref('');

const getVideoType = (url) => {
    const extension = url.split('.').pop().toLowerCase();
    switch(extension) {
        case 'mp4': return 'video/mp4';
        case 'webm': return 'video/webm';
        case 'ogg': return 'video/ogg';
        case 'mov': return 'video/quicktime';
        default: return 'video/mp4';
    }
};

const openVideo = (url) => {
    videoError.value = '';
    const baseUrl = 'http://localhost:8086'; // Backend manzilingiz

    try {
        currentVideoUrl.value = url.startsWith('/') ? `${baseUrl}${url}` : url;
        currentVideoTitle.value = contents.value.find(item => item.contentUrl === url)?.name || '';
        videoType.value = getVideoType(currentVideoUrl.value);
        showVideoModal.value = true;

        const video = new Audio(currentVideoUrl.value);
        video.onerror = () => {
            videoError.value = `Video yuklanmadi (${video.error?.code || "Noma'lum xato"})`;
            };
  } catch (err) {
    videoError.value = 'Video ochishda xato yuz berdi';
    console.error('Video error:', err);
  }
};

const closeVideo = () => {
  showVideoModal.value = false;
  currentVideoUrl.value = '';
  currentVideoTitle.value = '';
  videoType.value = '';
  videoError.value = '';
};

onMounted(() => {
  store.fetchContents();
});
</script>
