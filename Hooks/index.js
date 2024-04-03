// Import the necessary modules
import axios from "axios";

// Get the base URL from the environment variables
const baseUrl = "http://10.0.2.2:8000/api";

// Create an instance of axios with the base URL and enable sending cookies
const authApi = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

// Set the common header for all requests to be "application/json"
authApi.defaults.headers.common["Content-Type"] = "application/json";

export { authApi };
