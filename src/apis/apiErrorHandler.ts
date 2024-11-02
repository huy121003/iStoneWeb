// apiErrorHandler.ts
export const handleApiError = (error: any) => {
    if (error.response) {
      // Lỗi được trả về từ server
    
      return {
        status: error.response.status,
        message: error.response.data.message || "Something went wrong on the server.",
      };
    } else if (error.request) {
      // Không nhận được phản hồi từ server
    
      return {
        status: null,
        message: "No response from the server. Please check your network connection.",
      };
    } else {
 
      return {
        status: null,
        message: error.message || "An unexpected error occurred.",
      };
    }
  };
  