import {defineStore} from "pinia";
import {client} from "../../plugins/axios.js";

export const useAddFile = defineStore('add-file', () => {
    async function addFile(file, name) {
        try {
            const formData = new FormData();
            formData.append('file', file); // Fayl maydoni
            formData.append('name', name);  // Nom maydoni

            const response = await client.post('/media_objects', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            return response.data;
        } catch (error) {
            throw error;
        }
    }

    return { addFile };
});
