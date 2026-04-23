import { BASE_URL } from "../utils/constants";
import axios from "axios";

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
})

api.interceptors.response.use(
    (response) => response,
    async(error)=>{
        const originalRequest = error.config;
        console.log(error);

if (originalRequest.url.includes("/auth/refresh") || originalRequest.url.includes("/auth/me")) {
      return Promise.reject(error);
    }

        if(!originalRequest._retry && error.response?.status === 401){
            originalRequest._retry = true;

            try{
                await api.post("/auth/refresh")
                console.log(originalRequest)
                return api(originalRequest);
            }
            catch(err){
                console.log("refresh failed ", err);
                return Promise.reject(error)
            }
        }
        return Promise.reject(error);
    }
)

export default api;