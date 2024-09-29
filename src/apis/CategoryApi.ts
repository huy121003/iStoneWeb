import apiHandler from "./apiConfig";
import { ApiMethods } from "./apiMethods";

export const FetchCategoryApi = async () => {
  try {
    const response = await apiHandler(ApiMethods.GET, "/api/v1/category");
    console.log("Response:", response);
    return response;
  } catch (error: any) {
    console.error("Error Message:", error.message);
  }
};
export const FetchCategoryApibyId = async (id: number) => {
  try {
    const response = await apiHandler(ApiMethods.GET, `/api/v1/category/${id}`);
    console.log("Response:", response);
    return response;
  } catch (error: any) {
    console.error("Error Message:", error.message);
  }
}
