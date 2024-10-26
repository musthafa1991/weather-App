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
        `http://localhost:4001/api/wheatherdata?city=${city}&from=${fromDate}&to=${toDate}`
      );
    } else {
      // Call the API for current weather data
      response = await axios.post("http://localhost:4001/api/wheatherdata", {
        city,
      });
    }

    if (response.status !== 200) {
      toast.error(response.data.message || "An unexpected error occurred.");
      return null;
    }

    const data = response.data;

    if (Array.isArray(data)) {
      // Format historical data
      const formattedData = data.map((item) => {
        const date = new Date(item.timestamp);
        const formattedDate = date.toLocaleString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        });

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
