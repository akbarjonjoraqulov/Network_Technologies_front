<script setup>
import {reactive, ref} from 'vue';
import {useGetUser} from '../stores/user/getUser';

const {state, getMembers, deleteMember} = useGetUser();

// Delete modal state
const showDeleteModal = ref(false);
const memberToDelete = ref(null);

const confirmDelete = (userId) => {
    memberToDelete.value = userId;
    showDeleteModal.value = true;
};

const handleDelete = async () => {
    if (memberToDelete.value) {
        try {
            await deleteMember(memberToDelete.value);
            showDeleteModal.value = false;
        } catch (error) {
            // Error is already handled in the store
        } finally {
            memberToDelete.value = null;
        }
    }
};

getMembers();
</script>
<template>
    <div class="my-32 mx-auto max-w-6xl px-4">
        <!-- Button and Status -->
        <div class="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <button
                @click="getMembers"
                :disabled="state.loading"
                class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
        <span v-if="state.loading" class="flex items-center gap-2">
          <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
               viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Yuklanmoqda...
        </span>
                <span v-else>Yuklash</span>
            </button>

            <div v-if="state.error" class="px-4 py-2 bg-red-100 text-red-700 rounded-lg flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clip-rule="evenodd"/>
                </svg>
                {{ state.error.message }}
            </div>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto bg-white rounded-lg shadow">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                <tr>
                    <th scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ism/Familiya
                    </th>
                    <th scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email
                    </th>
                    <th scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID
                    </th>
                    <th scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rollar
                    </th>
                    <th scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Yaratilgan
                    </th>
                    <th scope="col"
                        class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Harakatlar
                    </th>
                </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                <tr v-if="state.members.length === 0 && !state.loading">
                    <td colspan="6" class="px-6 py-4 text-center text-gray-500">
                        Foydalanuvchilar topilmadi
                    </td>
                </tr>
                <tr v-for="member in state.members" :key="member.userId" class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="font-medium text-gray-900">{{ member.givenName }} {{ member.familyName }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-gray-500">
                        {{ member.email }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-gray-500">
                        {{ member.userId }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex flex-wrap gap-1">
                <span v-for="role in member.roles" :key="role"
                      class="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                  {{ role }}
                </span>
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-gray-500">
                        {{ new Date(member.createdAt).toLocaleDateString() }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                            @click="confirmDelete(member.userId)"
                            class="text-red-600 hover:text-red-900"
                            :disabled="state.deletingId === member.userId"
                        >
                <span v-if="state.deletingId === member.userId" class="flex items-center gap-1">
                  <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  O'chirilmoqda
                </span>
                            <span v-else class="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                       stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                  O'chirish
                </span>
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>

        <!-- Delete Confirmation Modal -->
        <div v-if="showDeleteModal"
             class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                <h3 class="text-lg font-medium text-gray-900 mb-4">Foydalanuvchini o'chirish</h3>
                <p class="text-gray-600 mb-6">Haqiqatan ham bu foydalanuvchini o'chirmoqchimisiz? Bu amalni qaytarib
                    bo'lmaydi.</p>
                <div class="flex justify-end space-x-3">
                    <button
                        @click="showDeleteModal = false"
                        class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                        Bekor qilish
                    </button>
                    <button
                        @click="handleDelete"
                        class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center gap-2"
                        :disabled="state.deletingId !== null"
                    >
                        <svg v-if="state.deletingId !== null" class="animate-spin h-4 w-4"
                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {{ state.deletingId !== null ? 'O\'chirilmoqda...' : 'O\'chirish' }}
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div>
        <router-link to="/darslik" class="flex justify-center text-4xl font-bold hover:text-green-500">
            Darsliklar
        </router-link>
    </div>
</template>

<style scoped>

</style>
