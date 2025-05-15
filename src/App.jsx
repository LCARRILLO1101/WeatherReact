import { useState, useEffect } from "react"; // Importo useState para los estados y useEffect para los efectos
import axios from 'axios'; // Cambiado a comillas simples
import './App.css';
import WeatherSearch from "./components/WeatherSearch";
import WeatherDisplay from "./components/WeatherDisplay";

function App() {
  const [city, setCity] = useState(''); // Estado para guardar la ciudad a consultar
  const [weatherData, setWeatherData] = useState(null);
  const [errorm, setError] = useState(null);

  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

  const fetchWeather = async (cityName) => {
    setError(null); // Reseteamos errores previos
    setWeatherData(null); // Limpiamos datos anteriores

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
    try {
      const response = await axios.get(apiUrl);
      setWeatherData(response.data);
      console.log(response.data); // Cambiado para mostrar los datos de respuesta
    } catch (error) {
      console.log(error);
      setError(error); // Establecer el error en el estado
    }
  };

  useEffect(() => {
    fetchWeather("london");
  }, []);

  //console.log(weatherData);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 dark:from-gray-800 dark:via-gray-900 dark:to-black text-gray-900 dark:text-white flex flex-col items-center p-4 pt-10">
      <h1 className="text-4xl font-bold mb-4 text-blue-700 dark:text-blue-300">Mi App del clima con React</h1>
      <WeatherSearch city={city} setCity={setCity} onSearch={fetchWeather}/>
      <WeatherDisplay weatherData={weatherData}/>
    </div>
  );
}

export default App;
