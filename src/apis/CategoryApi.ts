import apiHandler from "./apiConfig";
import { ApiMethods } from "./apiMethods";
import queryString from "query-string";
import { handleApiError } from "./apiErrorHandler";

// Fetch all categories with optional query parameters
export const FetchCategoryApi =  (params: Record<string, any> = {}):Promise<any> => {
 
    // Tạo query string từ params
    const query = queryString.stringify(params);
   return  apiHandler(
      ApiMethods.GET,
      `/api/v1/category${query ? `?${query}` : ""}`
    );
   
};

// Fetch category by ID with optional query parameters
export const FetchCategoryApibyId =  (id: number, params: Record<string, any> = {}):Promise<any> => {

    // Tạo query string từ params
    const query = queryString.stringify(params);
   return apiHandler(
      ApiMethods.GET,
      `/api/v1/category/${id}${query ? `?${query}` : ""}`
    );

};
