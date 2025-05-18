import { defineStore } from "pinia";
import axios from "axios";

export const useAuthorization = defineStore('authorization', () => {
    function userAuth(data) {
        return new Promise((resolve, reject) => {
            axios.post("http://localhost:8086/api/users/auth", data)
                .then((res) => {
                    localStorage.setItem("token", res.data.token);
                    resolve(res);
                })
                .catch(() => {
                    reject();
                });
        });
    }

    return { userAuth };
});
