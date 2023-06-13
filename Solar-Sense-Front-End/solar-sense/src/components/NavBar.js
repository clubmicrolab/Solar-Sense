import React , {useEffect, useState}  from "react";
import {Routes, Route, Link} from 'react-router-dom'
import { useNavigate} from "react-router-dom";
import {RiUserLocationLine} from 'react-icons/ri'
import {BsCalendarDate} from 'react-icons/bs'
import {BiCircle} from 'react-icons/bi'

export default function NavBar() {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const latitude = 47.0105; // Replace with the actual latitude
    const longitude = 28.8638; // Replace with the actual longitude
    const weatherAPIKey = '8facc2deeae24d72a71151241232905'

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(
                `https://api.weatherapi.com/v1/forecast.json?key=${weatherAPIKey}&q=${latitude},${longitude}&days=7&hourly=24`,
            );
            const data = await response.json();
            setWeatherData(data);
            setLoading(false);
          } catch (error) {
            console.error('Error fetching weather data:', error);
          }
        };
      
        fetchData();
        console.log(weatherData)
      }, []);
      
  
      return (
        <div>
          <nav className="navbar">
            {loading ? (
              <div>Loading weather data...</div>
            ) : (
              <div>
                <div className="current">
                {weatherData && (
                  <>
                    <img className="currentImage" src={weatherData.current.condition.icon} alt="Weather Icon" />
                    <div className="currentTemperature">{weatherData.current.feelslike_c}°C</div>
                    <div className="currentHumidity">Humidity: {weatherData.current.humidity}%</div>
                    <div className="currentClouds">Clouds: {weatherData.current.cloud}%</div>
                    <div className="condition">{weatherData.current.condition.text}</div>
                    <hr className="horizontal-line" />
                    <div className="location"><RiUserLocationLine/>{ } {weatherData.location.name}, {weatherData.location.country}</div>
                    <div className="currentTime"><BsCalendarDate/>{ } {weatherData.current.last_updated}</div>
                  </>
                )}
                </div>
                  <div className="predictedWeather">
                    {weatherData.forecast.forecastday.map(day => {
                        return (
                        <div className="forecastDay" id={day.date}>
                            {day.date}
                            <div>Predicted Energy Production: 218 kW</div>
                            <hr className="horizontal-line" />
                        </div>
                    )})}
                  </div>
              </div>
            )}
          </nav>
        </div>
      );
    
}
