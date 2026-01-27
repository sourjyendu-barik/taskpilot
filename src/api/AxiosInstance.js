import axios from "axios";

export const AxiosInstance = axios.create({
  baseURL: "https://task-pilot-beta.vercel.app/api",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

AxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);
