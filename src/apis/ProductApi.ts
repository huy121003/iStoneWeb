import apiHandler from "./apiConfig";
import { ApiMethods } from "./apiMethods";
import queryString from "query-string";
import { handleApiError } from "./apiErrorHandler";

// Fetch all products with optional query parameters
export const FetchProductApi = async (
  categoryId: number,
  categoryChildren: number | null,
  sortOption: string,
  page: number,
  itemsPerPage: number,
  keyword?: string
) => {
  try {
    const queryParams = queryString.stringify({
      page,
      take: itemsPerPage,
      categoryId,
      categoryChildren: categoryChildren || undefined, // Bỏ qua nếu null
      order: sortOption || undefined, // Bỏ qua nếu rỗng
      keyword: keyword || undefined, // Bỏ qua nếu rỗng
    });

    const response = await apiHandler(
      ApiMethods.GET,
      `/api/v1/product?${queryParams}`
    );

    console.log(`/api/v1/product?${queryParams}`);
    return response.data;
  } catch (error: any) {
    const errorDetails = handleApiError(error);
    return errorDetails; // Hoặc throw errorDetails để bắt ở component
  }
};

// Fetch product details by ID
export const FetchProductDetailApi = async (id: number) => {
  try {
    const response = await apiHandler(
      ApiMethods.GET,
      `/api/v1/product/${id}/parent`
    );
    return response;
  } catch (error: any) {
    const errorDetails = handleApiError(error);
    return errorDetails; // Hoặc throw errorDetails để bắt ở component
  }
};
