# Weather App

## Description
The Weather App is a designed to provide real-time weather updates and historical weather data for various cities.
Built with modern web technologies, the app allows users to search for a city, view current weather conditions, and access past weather records for specified date ranges.
## Technologies Used
- Frontend: React js,
- Backend: Node.js.
- Database: MongoDB.

## Getting Started
## How to Run the Project
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/musthafa1991/weather-App.git
   cd weather-App
   ```

2. **Install Dependencies**:
   - For the frontend:
     ```bash
     cd frontend
     npm install
     ```

   - For the backend:
     ```bash
     npm install
     ```

3. **Set Up Environment Variables**: Create a `.env` file in the backend directory and add your OpenWeatherMap API key:
   ```
   PORT
   MONGO_URL
   WEATHER_API_URL=https://api.openweathermap.org/data/2.5/weather
   WEATHER_API_KEY=your_openweathermap_api_key
   ```

4. **Run the Backend Server**:
   ```bash
   from weather-App
   npm run dev
   ```

5. **Run the Frontend Application**:
   ```bash
   cd frontend
   npm run dev
   ```

6. **Access the App**:
   ```bashOpen your web browser and navigate to `http://localhost:3001` to view the application.
   ```
Here's how you can add details about checking the API in your README file, including examples for both the GET and POST requests:

```markdown
## API Endpoints


## How to Test the Api

### 1. Get Weather Data (GET Request)

**Endpoint**: 
```
GET http://localhost:4001/api/weatherdata?city=Delhi&from=2024-09-24&to=2024-10-30
```

**Description**: 
This endpoint retrieves historical weather data for a specified city and date range.

**Query Parameters**:
- `city`: The name of the city you want to fetch weather data for.
- `from`: The start date for the historical data in `YYYY-MM-DD` format.
- `to`: The end date for the historical data in `YYYY-MM-DD` format.

**Example Request**:
```bash
curl -X GET "http://localhost:4001/api/weatherdata?city=Delhi&from=2024-09-24&to=2024-10-30"
```

**Response**: 
The response will contain the historical weather data for the specified city and date range in JSON format.

---

### 2. Submit Weather Data (POST Request)

**Endpoint**: 
```
POST http://localhost:4001/api/weatherdata
```

**Description**: 
This endpoint allows you to submit a city to get its current weather data.

**Request Body**:
- `city`: The name of the city you want to fetch weather data for. 

**Example Request**:
```bash
curl -X POST "http://localhost:4001/api/weatherdata" \
-H "Content-Type: application/json" \
-d '{"city": "Delhi"}'
```

**Response**: 
The response will contain the current weather data for the specified city in JSON format.

---

## Testing the API

You can test the API endpoints using tools like **Postman** or command-line tools like **curl** as shown in the examples above. Make sure your backend server is running at `http://localhost:4001` before making requests.

```

