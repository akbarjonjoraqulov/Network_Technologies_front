
import { defineStore } from "pinia";
import {client} from "../../plugins/axios.js";

export const useRegistration = defineStore('registration', () => {
    function userRegistration(data) {
        return new Promise((resolve, reject) => {
            client.post("users/my", data)
                .then((res) => {
                    localStorage.setItem("token", res.data.token);
                    resolve(res);
                })
                .catch(() => {
                    reject();
                });
        });
    }

    return { userRegistration };
});
