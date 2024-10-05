// apiErrorHandler.ts
export const handleApiError = (error: any) => {
    if (error.response) {
      // Lỗi được trả về từ server
      console.error("Server Error:", error.response.data);
      return {
        status: error.response.status,
        message: error.response.data.message || "Something went wrong on the server.",
      };
    } else if (error.request) {
      // Không nhận được phản hồi từ server
      console.error("Network Error:", error.message);
      return {
        status: null,
        message: "No response from the server. Please check your network connection.",
      };
    } else {
      // Lỗi khác
      console.error("Error:", error.message);
      return {
        status: null,
        message: error.message || "An unexpected error occurred.",
      };
    }
  };
  