import { defineStore } from "pinia";
import { client } from "../../plugins/axios.js";
import { reactive } from "vue";

export const useGetUser = defineStore('getUser', () => {
    const state = reactive({
        members: [],
        loading: false,
        error: null,
        deletingId: null // Track which member is being deleted
    });

    async function getMembers() {
        state.loading = true;
        state.error = null;

        try {
            const response = await client.get('users');

            state.members = response.data?.member || [];

            state.members = state.members.map(member => ({
                context: member['@context'],
                id: member['@id'],
                type: member['@type'],
                userId: member.id,
                familyName: member.familyName,
                givenName: member.givenName,
                email: member.email,
                roles: member.roles,
                createdAt: member.createdAt
            }));

        } catch (error) {
            state.error = error;
            throw error;
        } finally {
            state.loading = false;
        }
    }

    async function deleteMember(userId) {
        state.deletingId = userId;
        state.error = null;

        try {
            await client.delete(`users/${userId}`);

            // Remove the deleted member from the list
            state.members = state.members.filter(member => member.userId !== userId);

        } catch (error) {
            state.error = error;
            throw error;
        } finally {
            state.deletingId = null;
        }
    }

    return { state, getMembers, deleteMember };
});
