// con fig axios
import axios from 'axios';
import { URL_API } from '@env';
import { ApiMethods } from './apiMethods';
const apiConfig = axios.create({
  baseURL: URL_API,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 5000,
});


const apiHandler = async (method: ApiMethods, url: string, data?: any) => {
    try {
        const response = await apiConfig({
            method,
            url,
            data,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export default apiHandler;
