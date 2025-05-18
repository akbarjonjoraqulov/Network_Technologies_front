<script setup>
import { reactive, ref, computed, onMounted } from "vue";
import { useAddFile } from "../stores/content/postContent.js";
import { useDeleteFile } from '../stores/content/deleteContent.js';
import { useFetchContents } from "../stores/content/getContent";
import Navbar from "../components/Navbar.vue";
import {client} from "../plugins/axios.js";

// Store-lar
const store = useFetchContents();
const deleteStore = useDeleteFile();
const contents = computed(() => store.state.content);

// Video modal uchun state
const showVideoModal = ref(false);
const currentVideoUrl = ref('');
const currentVideoTitle = ref('');
const videoType = ref('');
const videoError = ref('');

// O'chirish modal uchun state
const showDeleteModal = ref(false);
const deleteItemId = ref(null);
const deleteItemName = ref('');
const isDeleting = ref(false);

// Video yuklash uchun state
const file = ref(null);
const isLoading = ref(false);
const video = reactive({
    name: '',
});

// Video formatini aniqlash
const getVideoType = (url) => {
    const extension = url.split('.').pop().toLowerCase();
    switch (extension) {
        case 'mp4': return 'video/mp4';
        case 'webm': return 'video/webm';
        case 'ogg': return 'video/ogg';
        case 'mov': return 'video/quicktime';
        default: return 'video/mp4';
    }
};

// Videoni ochish
const openVideo = (url) => {
    videoError.value = '';

    try {
        currentVideoUrl.value = url.startsWith('/') ? `${client}${url}` : url;
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

// Videoni yopish
const closeVideo = () => {
    showVideoModal.value = false;
    currentVideoUrl.value = '';
    currentVideoTitle.value = '';
    videoType.value = '';
    videoError.value = '';
};

const handleFileChange = (event) => {
    file.value = event.target.files[0];
};

const confirmDelete = (item) => {
    if (!item?.id) {
        console.error("ID topilmadi. Obyekt:", item);
        alert("Ushbu elementni o'chirish uchun ID aniqlanmadi");
        return;
    }

    deleteItemId.value = item.id;
    deleteItemName.value = item.name || "Nomsiz element";
    showDeleteModal.value = true;
};
const deleteItem = async () => {
    if (!deleteItemId.value) {
        alert("O'chirish uchun ID topilmadi");
        return;
    }

    // ID ni stringga aylantirish
    const idString = String(deleteItemId.value);

    // Vaqtincha ID larni tekshirish
    if (idString.startsWith('temp-')) {
        alert("Noto'g'ri ID formati. Iltimos, sahifani yangilang.");
        return;
    }

    isDeleting.value = true;

    try {
        await deleteStore.deleteFile(deleteItemId.value);
        await store.fetchContents();
        showDeleteModal.value = false;
        alert('Muvaffaqiyatli o\'chirildi!');
    } catch (error) {
        console.error('O\'chirishda xato:', error);
        alert(`O'chirish amalga oshmadi: ${error.response?.data?.message || error.message}`);
    } finally {
        isDeleting.value = false;
    }
};

const addVideo = async () => {
    if (!file.value) {
        alert('Iltimos, video faylni tanlang!');
        return;
    }

    if (!video.name) {
        alert('Iltimos, video nomini kiriting!');
        return;
    }

    isLoading.value = true;

    try {
        const response = await useAddFile().addFile(file.value, video.name);
        console.log('Server javobi:', response);
        alert('Video muvaffaqiyatli yuklandi!');
        await store.fetchContents(); // Ro'yxatni yangilash

        video.name = '';
        file.value = null;
    } catch (error) {
        console.error('Detallar:', error.response?.data);
        alert(`Xato: ${error.response?.data?.message || 'Yuklash amalga oshmadi'}`);
    } finally {
        isLoading.value = false;
    }
};

// Komponent yuklanganda ma'lumotlarni olish
onMounted(async () => {
    await store.fetchContents();
    console.log("Ma'lumotlar:", store.state.content); // Barcha ma'lumotlarni ko'rish
    console.log("Birinchi element ID:", store.state.content[0]?.id); // ID ni tekshirish
});
</script>

<template>
    <Navbar />

    <div class="px-4 py-32 md:py-24">
        <h1 class="text-lg font-semibold mb-3">Media obyektlar</h1>

        <div v-if="store.isLoading" class="text-gray-500 py-2">Yuklanmoqda...</div>
        <div v-else-if="store.error" class="text-red-500 py-2">{{ store.error }}</div>

        <div v-else>
            <table class="w-full border-collapse">
                <thead>
                <tr class="bg-gray-100">
                    <th class="border p-2 text-left">No</th>
                    <th class="border p-2 text-left">Nomi</th>
                    <th class="border p-2 text-left">Harakatlar</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in contents" :key="item.id || index" class="hover:bg-gray-50">

                    <td class="border p-2">{{ index + 1 }}</td>
                    <td class="border p-2 cursor-pointer" @click="openVideo(item.contentUrl)">
                        {{ item.name }}
                    </td>
                    <td class="border p-2">
                        <button @click.stop="confirmDelete(item)"
                                class="text-red-500 hover:text-red-700"
                                :disabled="!item.id"> <!-- ID yo'q bo'lsa tugma o'chirib qo'yiladi -->
                            O'chirish
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
            <div class="mt-2 text-sm text-gray-600">Jami: {{ store.state.totalItems }} ta</div>
        </div>
    </div>

    <!-- Video yuklash formasi -->
    <div class="my-32 mx-auto max-w-6xl px-4">
        <div class="flex justify-center m-5">
            <h3 class="text-5xl font-bold">Video yuklash</h3>
        </div>
        <div class="flex justify-center gap-3">
            <input
                v-model="video.name"
                class="border-[1px] rounded-xl px-2"
                type="text"
                placeholder="video nomi"
                required
            >
            <input
                @change="handleFileChange"
                class="border-[1px] rounded-xl px-2"
                type="file"
                accept="video/*"
                required
            >
        </div>
        <div class="flex justify-center m-5">
            <button
                @click="addVideo"
                :disabled="isLoading"
                class="bg-blue-600 py-1 px-3 rounded-md text-white disabled:bg-blue-400"
            >
                {{ isLoading ? 'Yuklanmoqda...' : 'Yuklash' }}
            </button>
        </div>
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

    <!-- O'chirish tasdiqlash modali -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 class="text-lg font-medium mb-4">"{{ deleteItemName }}" ni o'chirishni tasdiqlaysizmi?</h3>
            <div class="flex justify-end gap-3">
                <button
                    @click="showDeleteModal = false"
                    class="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                    :disabled="isDeleting"
                >
                    Bekor qilish
                </button>
                <button
                    @click.stop="deleteItem"
                    class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    :disabled="isDeleting"
                >
                    <span v-if="isDeleting">O'chirilmoqda...</span>
                    <span v-else>O'chirish</span>
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
