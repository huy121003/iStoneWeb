import apiHandler from "./apiConfig";
import { ApiMethods } from "./apiMethods";

export const FetchProductApi = async (
  categoryId: number,
  categoryChildren: number | null,
  sortOption: string,
  page: number,
  itemsPerPage: number
) => {
  try {
    const response = await apiHandler(
      ApiMethods.GET,
      `/api/v1/product?page=${page}&take=${itemsPerPage}&categoryId=${categoryId}${
        categoryChildren ? `&categoryChildren=${categoryChildren}` : ""
      }${sortOption ? `&sortBy=${sortOption}` : ""}`
    );

    console.log(
      `/api/v1/product?page=${page}&take=${itemsPerPage}&categoryId=${categoryId}${
        categoryChildren ? `&categoryChildren=${categoryChildren}` : ""
      }${sortOption ? `&sortBy=${sortOption}` : ""}`
    );
    return response.data; // Hoặc điều chỉnh theo cấu trúc dữ liệu bạn nhận được
  } catch (error: any) {
    console.error("Error Message:", error.message);
    throw error; // Ném lại lỗi để có thể xử lý ở nơi gọi hàm
  }
};
export const FetchProductDetailApi = async (id: number) => {
  try {
    const response = await apiHandler(ApiMethods.GET, `/api/v1/product/${id}/parent`);
    //console.log("Response:", response);
    return response;
  } catch (error: any) {
    console.error("Error Message:", error.message);
  }
};
