import { client } from "../../plugins/axios.js";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useDeleteFile = defineStore('delete-file', () => {
    const isDeleting = ref(false);
    const error = ref(null);

    const deleteFile = async (id) => {
        isDeleting.value = true;
        error.value = null;

        try {
            const response = await client.delete(`media_objects/${id}`);
            return response.data;
        } catch (err) {
            console.error("O'chirishda xato:", err.response?.data || err.message);
            error.value = err;
            throw err;
        } finally {
            isDeleting.value = false;
        }
    };

    return { deleteFile, isDeleting, error };
});
