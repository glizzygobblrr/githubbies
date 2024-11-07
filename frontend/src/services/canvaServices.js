import axios from "axios";

// Example to get Canva Authorization URL
export const getCanvaAuthorization = async () => {
  try {
    const response = await axios.get("/api/canva-auth-url"); // Backend API to get Canva authorization URL
    return response.data;
  } catch (error) {
    console.error("Failed to get Canva Authorization", error);
    return null;
  }
};

// Example to get the logged-in user's profile
export const getUser = async () => {
  try {
    const response = await axios.get("/api/user-profile"); // Backend API to get user profile
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user profile", error);
    return null;
  }
};

// Example to revoke Canva authorization
export const revoke = async () => {
  try {
    const response = await axios.post("/api/revoke-canva-integration"); // Backend API to revoke Canva integration
    return response.data.success;
  } catch (error) {
    console.error("Failed to revoke Canva authorization", error);
    return false;
  }
};
