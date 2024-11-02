import axios from "axios";
import { ApiMethods } from "./apiMethods";

//const URL_API = import.meta.env.VITE_URL_API as string; // Lấy biến môi trường từ Vite

// Tạo instance axios
const apiConfig = axios.create({
  baseURL: "https://api.istone.vn",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000, // Đặt thời gian chờ 5 giây cho yêu cầu
});

// Hàm xử lý lỗi riêng
const handleError = (error: any) => {
  if (error.response) {
    // Phản hồi từ server với mã lỗi

    throw new Error(`Error: ${error.response.status} - ${error.response.data}`);
  } else if (error.request) {
    // Yêu cầu đã được gửi nhưng không nhận được phản hồi

    throw new Error("No response received from server.");
  } else {
    // Lỗi trong quá trình thiết lập yêu cầu
   
    throw new Error(`Request error: ${error.message}`);
  }
};

// Xử lý yêu cầu thông qua apiHandler
const apiHandler = async (method: ApiMethods, url: string, data?: any) => {
  try {
    const response = await apiConfig({
      method,
      url,
      data,
    });
    return response.data;
  } catch (error: any) {
    handleError(error); // Sử dụng hàm xử lý lỗi
  }
};

export default apiHandler;
