import axios from "axios";
import { toast } from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    import.meta.env.FALLBACK_VITE_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Request interceptor to add token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response, // Directly pass through successful responses (2xx codes)
  (error) => {
    const status = error.response?.status;
    const serverMessage = error.response?.data?.message;

    // Intercept both 401 Unauthorized or accidental 400 bad auth formats
    if (
      status === 401 ||
      (status === 400 && serverMessage?.toLowerCase().includes("token"))
    ) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      toast.error(serverMessage || "Session expired. Please log in again.", {
        id: "auth-redirect-toast",
        duration: 4000,
      });

      setTimeout(() => {
        window.location.href = "/signin";
      }, 1000);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
