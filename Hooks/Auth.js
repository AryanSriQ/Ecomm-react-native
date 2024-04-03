// Import the necessary modules
import { authApi } from ".";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Register User
 * @param {object} user - The user object with Register credentials
 * @returns {Promise<object>} - The response data
 */
// Define an asynchronous function called signUpUser that takes in a user object as a parameter
export const signUpUser = async (user) => {
  // Send a POST request to the "/auth/register" endpoint of the authApi with the user object as the payload, and assign the response to the "response" variable
  const response = await authApi.post("/auth/register", user);
  // Return the data property of the response object
  return response.data;
};

/**
 * Logs in a user and saves the authentication token
 * @param {object} user - The user object with login credentials
 * @returns {Promise<object>} - The response data, including the authentication token
 */
export const logInUser = async (user) => {
  // Send a POST request to the authentication API with the user object
  const response = await authApi.post("/auth/login", user);

  // Save the authentication token in AsyncStorage
  await AsyncStorage.setItem("authToken", response.data.token);

  // Return the response data
  return response.data;
};
