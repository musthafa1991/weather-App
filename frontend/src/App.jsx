import React, { useEffect } from "react";
import WeatherCard from "./components/WeatherCard";
import backgroundImage from "../src/assets/background-image.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

function App() {
  useEffect(() => {
    toast.info("Welcome to the Weather App!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }, []);

  return (
    <div className="app h-screen relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-no-repeat bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          filter: "blur(8px)",
          zIndex: -1,
          backgroundColor: "rgba(255, 165, 0, 0.5)",
          mixBlendMode: "multiply",
        }}
      />
      <div className="flex items-center justify-center h-full">
        <div className="bg-white bg-opacity-60 p-6 rounded-3xl w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2">
          <WeatherCard />
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;
