import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL:"http://localhost:1001/api",
    withCredentials:true,
})