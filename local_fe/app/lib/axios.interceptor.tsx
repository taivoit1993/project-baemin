import useAuthStore from "@/app/state/auth.store";
import { notification } from "antd";
import axios from "axios";

const api = axios.create({
  baseURL: "/api", // Set your base API URL here
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    // Add authorization token or modify request if needed
    const { token } = useAuthStore.getState() as { token: string }; // Get the token from Zustand store
    console.log(token);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Attach token to the Authorization header
    }
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response) => {
    // Handle successful response
    console.log(response);
    return response;
  },
  (error) => {
    // Handle response error globally
    if (error.response) {
      notification.error({
        message: "Error Occurred",
        description:
          "There was an issue processing your request. Please try again later.",
        duration: 3,
      });
      console.error("Error response:", error.response);
      // Show error messages, handle specific status codes, etc.
      if (error.response.status === 401) {
        // Unauthorized access (e.g., redirect to login)
        // window.location.href = "/login";
      }
    } else if (error.request) {
      console.error("Error request:", error.request);
    } else {
      console.error("General Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
