import axios from "axios";
import dotenv from "dotenv";

dotenv.config()
export const rdApi = axios.create({
    baseURL: process.env.RD_API_URL,
    params: {
        token: process.env.RD_TOKEN,
    }
});