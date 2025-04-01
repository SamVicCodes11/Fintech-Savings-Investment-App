import axios from "axios";

export const fetchData = async () => {
  try {
    const response = await axios.get("/data.json"); // Path to mock data
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
