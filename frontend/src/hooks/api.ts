import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3333',
})

export const useApi = () => ({
    validateToken: async (token: string) => {
        const response = await api.post('/user/validate', { token });
        return response.data;
    },
    login: async (user: string, passwd: string) => {
        const response = await api.post('/user/login', { user, passwd }).then((response) => {

            return response.data;
        }).catch((err) => {
            return {message: {
                type: "error",
                message: "Servidor fora do ar"
            }}
        })
        return response
    },
    logout: async (token: string | null) => {
        const response = await api.post('/user/logout', {token});
        return response.data;
    },
});