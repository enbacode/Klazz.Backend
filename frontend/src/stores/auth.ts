import { defineStore } from 'pinia';
import { ref } from 'vue';
import { UserDto } from '@/api';
import apiClient from '@/api/apiClient';

export const useAuthStore = defineStore('auth', () => {
    const token = ref<string | null>(localStorage.getItem('token'));
    const user = ref<UserDto | null>(null);

    async function login(email: string, password: string) {
        const response = await apiClient.post('/account/login', { email, password });
        setAuth(response.data);
    }

    async function register(username: string, email: string, password: string) {
        const response = await apiClient.post('/account/register', { username, email, password });
        setAuth(response.data);
    }

    function logout() {
        token.value = null;
        user.value = null;
        localStorage.removeItem('token');
    }

    function setAuth(authData: UserDto) {
        token.value = authData.token;
        user.value = authData;
        localStorage.setItem('token', authData.token);
    }

    return { token, user, login, register, logout };
});