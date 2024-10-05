import apiHandler from "./apiConfig";
import { ApiMethods } from "./apiMethods";
import queryString from "query-string";
import { handleApiError } from "./apiErrorHandler";

// Fetch all categories with optional query parameters
export const FetchCategoryApi = async (params: Record<string, any> = {}) => {
  try {
    // Tạo query string từ params
    const query = queryString.stringify(params);
    const response = await apiHandler(
      ApiMethods.GET,
      `/api/v1/category${query ? `?${query}` : ""}`
    );
    console.log("Response:", response);
    return response;
  } catch (error: any) {
    // Sử dụng hàm xử lý lỗi
    const errorDetails = handleApiError(error);
    return errorDetails; // Hoặc throw errorDetails để bắt ở component
  }
};

// Fetch category by ID with optional query parameters
export const FetchCategoryApibyId = async (id: number, params: Record<string, any> = {}) => {
  try {
    // Tạo query string từ params
    const query = queryString.stringify(params);
    const response = await apiHandler(
      ApiMethods.GET,
      `/api/v1/category/${id}${query ? `?${query}` : ""}`
    );
    console.log("Response:", response);
    return response;
  } catch (error: any) {
    // Sử dụng hàm xử lý lỗi
    const errorDetails = handleApiError(error);
    return errorDetails; // Hoặc throw errorDetails để bắt ở component
  }
};
