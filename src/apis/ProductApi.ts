import apiHandler from "./apiConfig";
import { ApiMethods } from "./apiMethods";
import queryString from "query-string";

// Fetch all products with optional query parameters
export const FetchProductApi = (queryParams: string): Promise<any> => {
  return apiHandler(ApiMethods.GET, `/api/v1/product?${queryParams}&orderBy=price`);
};

// Fetch product details by ID
export const FetchProductDetailApi = (id: number): Promise<any> => {
  return apiHandler(ApiMethods.GET, `/api/v1/product/${id}/parent`);
};
