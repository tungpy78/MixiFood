import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { router } from "expo-router"; // Dùng router của Expo để điều hướng
import { API_URL } from "../constants/Config"; // Lấy IP từ file config

// 1. Khởi tạo Instance
const authorizedAxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Cache-Control": "no-cache",
  },
  timeout: 1000 * 60 * 10, // 10 phút
});

// 2. Request Interceptor (Gắn Token)
authorizedAxiosInstance.interceptors.request.use(
  async (config) => {
    // KHÁC BIỆT 1: Phải dùng await với AsyncStorage
    const accessToken = await AsyncStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 3. Response Interceptor (Xử lý lỗi & Refresh Token)
authorizedAxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // KHÁC BIỆT 2: Xử lý lỗi logout
    const originalRequest = error.config;

    // --- CASE 1: Lỗi 401 (Unauthorized) -> Logout luôn ---
    if (error.response?.status === 401) {
      console.log("Lỗi 401: Token không hợp lệ hoặc hết hạn (mà không phải case refresh).");
      await handleLogout();
      return Promise.reject(error);
    }

    // --- CASE 2: Lỗi 410 (Gone) -> Cần Refresh Token ---
    if (error.response?.status === 410 && !originalRequest._retry) {
      originalRequest._retry = true; // Đánh dấu để không lặp vô hạn

      try {
        // Lấy Refresh Token từ bộ nhớ
        const refreshToken = await AsyncStorage.getItem("refreshToken");
        
        if (!refreshToken) {
             throw new Error("No refresh token available");
        }

        console.log("🔄 Đang Refresh Token...");

        // Gọi API Refresh (Lưu ý: Dùng axios thường để tránh lặp interceptor này)
        const response = await axios.put(`${API_URL}/auth/refresh-token`, { refreshToken });

        const { accessToken: newAccessToken } = response.data; // Backend trả về token mới
        
        // Lưu Token mới vào bộ nhớ
        await AsyncStorage.setItem("accessToken", newAccessToken);
        
        console.log("✅ Refresh thành công!");

        // Gắn token mới vào header của request cũ bị lỗi
        authorizedAxiosInstance.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Gọi lại request cũ
        return authorizedAxiosInstance(originalRequest);

      } catch (refreshError) {
        console.log("❌ Lỗi Refresh Token:", refreshError);
        // Nếu refresh thất bại -> Logout bắt buộc
        await handleLogout();
        return Promise.reject(refreshError);
      }
    }

    // --- CASE 3: Các lỗi khác ---
    if (error.response?.status !== 410) {
       const errorMessage = error.response?.data?.message || error.message;
       // KHÁC BIỆT 4: Dùng Alert thay vì Toast (hoặc cài thư viện Toast cho Mobile sau)
       Alert.alert("Lỗi", errorMessage); 
       console.log("API Error:", errorMessage);
    }

    return Promise.reject(error);
  }
);

// Hàm phụ trợ để Logout sạch sẽ
const handleLogout = async () => {
    await AsyncStorage.multiRemove(["accessToken", "refreshToken", "user"]);
    Alert.alert("Phiên đăng nhập hết hạn", "Vui lòng đăng nhập lại.");
    // KHÁC BIỆT 2: Dùng router của Expo
    router.replace("/(auth)/login");
};

export default authorizedAxiosInstance;