import axios from 'axios'

const storageData = localStorage.getItem("authToken");

const api = axios.create({
    baseURL: 'http://localhost:3333',
    headers: {
        'Authorization': `Bearer ${storageData}`
    }
})

export const useApi = () => ({
    validateToken: async () => {
        const response = await api.get('/validate');
        return response.data;
    },
    login: async (username: string, password: string) => {
        const response = await api.post('/login', { username, password })
        return response.data;
    },
    

    getUsers: async () => {
        const response = await api.get('/user')
        return response.data
    }
});
