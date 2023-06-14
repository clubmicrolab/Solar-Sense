import React , {useEffect, useState}  from "react";
import {Routes, Route, Link} from 'react-router-dom'
import { useNavigate} from "react-router-dom";
import {RiUserLocationLine} from 'react-icons/ri'
import {BsCalendarDate} from 'react-icons/bs'
import { getWeeklyPredictions } from "../requests";

export default function NavBar() {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const latitude = 47.061470;
    const longitude = 28.867153; 
    const weatherAPIKey = 'd121f163b27143a294e72016231306'
    const [weeklyPredictions, setWeeklyPredictions] = useState([]);

  



    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(
              `https://api.weatherapi.com/v1/forecast.json?key=${weatherAPIKey}&q=${latitude},${longitude}&days=7`,
          );
          const data = await response.json();
          setWeatherData(data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching weather data:', error);
        }
      };
    
      fetchData();

      //daily energy real data
      getWeeklyPredictions()
      .then((data) => {
        setWeeklyPredictions(data.data);
        console.log(data.data)
      })
      .catch((error) => {
        console.error('Error fetching energy data:', error);
      });
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
                  <p className="containerTitle">7-DAY FORECAST</p>
                    {weatherData.forecast.forecastday.map((day, index) => {
                        const [year, month, date] = day.date.split('-');
                        const formattedDate = `${date}.${month}`;
                        const energyProduction = weeklyPredictions[index];

                        return (
                            <div className="forecastDay" id={day.date} key={day.date}>
                                <div className="dateAndIcon">
                                    <div className="forecastDate">{formattedDate}</div>
                                    <img className="predIcon" src={day.day.condition.icon} alt="Weather Icon" />
                                </div>
                                <div className="predCondition">{day.day.condition.text}</div>
                                <div className="predTemperature">Temperature: {day.day.avgtemp_c}°C</div>
                                <div className="predHumidity">Humidity: {day.day.avghumidity}%</div>
                                <div className="predEnergy">Energy Production: {energyProduction} W</div>
                                <hr className="horizontal-line" />
                            </div>
                        );
                    })}
                  </div>
              </div>
            )}
          </nav>
        </div>
      );
    
}
