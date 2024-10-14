import apiHandler from "./apiConfig";
import { ApiMethods } from "./apiMethods";
import queryString from "query-string";
import { handleApiError } from "./apiErrorHandler";




export const FetchBannerApi=():Promise<any>=>{
    return apiHandler(ApiMethods.GET,'/api/v1/banner/display')
}
