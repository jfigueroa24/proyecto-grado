import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";

export const fetchApis = async () => {
  try {
    const response = await axios.get(`${API_URL}/apis`);
    return response.data;
  } catch (error) {
    console.error("Error fetching APIs", error);
  }
};
