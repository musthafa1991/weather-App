import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const fetchWeatherData = async (
  city,
  fromDate = null,
  toDate = null
) => {
  try {
    let response;

    if (fromDate && toDate) {
      // Call the API for historical weather data
      response = await axios.get(
        `http://localhost:4001/api/weatherdata?city=${city}&from=${fromDate}&to=${toDate}`
      );
      if (!response.data.length) {
        toast.error("No History Found between this date");
      }
    } else {
      // Call the API for current weather data
      response = await axios.post("http://localhost:4001/api/weatherdata", {
        city,
      });
    }

    if (response.status !== 200) {
      toast.error(response.data.message || "An unexpected error occurred.");
      return null;
    }
    const data = response.data;

    if (Array.isArray(data)) {
      const formattedData = data.map((item) => {
        const date = new Date(item.timestamp);

        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");

        const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;

        return {
          ...item,
          timestamp: formattedDate,
        };
      });
      return formattedData;
    } else {
      const formattedCurrentData = {
        city: data.city,
        temperature: data.temperature,
        description: data.description,
        icon: data.icon,
      };
      return formattedCurrentData;
    }
  } catch (err) {
    console.error("Error fetching weather data:", err);

    if (err.response && err.response.data && err.response.data.message) {
      toast.error(err.response.data.message);
    } else {
      toast.error("Failed to fetch weather data. Please try again later.");
    }
    return null;
  }
};
