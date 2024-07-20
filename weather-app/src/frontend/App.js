import React, { useState, useEffect } from 'react';
import Weather from './Weather';
import Forecast from './Forecast';
import './App.css';

function App() {
    const [weatherData, setWeather] = useState(null);
    const [forecastData, setForecast] = useState(null);
    const [unit, setUnit] = useState('imperial');
    const [currentSection, setCurrentSection] = useState('home');
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        console.log(weatherData);
    }, [weatherData]);

    useEffect(() => {
        console.log(forecastData);
    }, [forecastData]);

    const toggleUnit = () => {
        setUnit(unit === 'metric' ? 'imperial' : 'metric');
    };

    const convertTemp = (temp) => {
        return unit === 'metric' ? `${temp} °C` : `${(temp * 9/5 + 32).toFixed(2)} °F`;
    };

    const convertWindSpeed = (speed) => {
        return unit === 'metric' ? `${(speed * 3.6).toFixed(2)} km/h` : `${(speed * 2.237).toFixed(2)} mph`;
    };

    const handleNavClick = (section) => {
        setCurrentSection(section);
        setMenuOpen(false);  // Close the menu when a link is clicked
    };

    // Group forecast data by day
    const groupForecastByDay = (list) => {
        return list.reduce((acc, item) => {
            const date = new Date(item.dt_txt).toLocaleDateString();
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(item);
            return acc;
        }, {});
    };

    // Retrieve the current year
    const currentYear = new Date().getFullYear();

    return (
        <div className="App">
            <nav className="navbar">
                <div className="logo-title">
                    <img src="\weather_logo.png" width="60" height="55" alt="Weather Logo" />
                    <h1>US Weather Explorer</h1>
                </div>
                <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? '✖' : '☰'}
                </div>
                <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
                    <li><a href="#current-weather" onClick={() => handleNavClick('home')}>Current Weather</a></li>
                    <li><a href="#forecast" onClick={() => handleNavClick('forecast')}>Weather Forecast</a></li>
                </ul>
            </nav>
            <div className="content">
                <button className="unit-toggle" onClick={toggleUnit}>
                    Switch to {unit === 'metric' ? 'Fahrenheit' : 'Celsius'}
                </button>
                <div className="components">
                    {currentSection === 'home' && <Weather setWeather={setWeather} unit={unit} />}
                    {currentSection === 'forecast' && <Forecast setForecast={setForecast} unit={unit} />}
                </div>
                {weatherData && currentSection === 'home' && (
                    <div id="current-weather" className="weather-info">
                        <h2>Current Weather for {weatherData.name}</h2>
                        <p>{weatherData.weather[0].description}</p>
                        <p>Temperature: {convertTemp(weatherData.main.temp)}</p>
                        <p>Humidity: {weatherData.main.humidity}%</p>
                        <p>Wind Speed: {convertWindSpeed(weatherData.wind.speed)}</p>
                        <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt={weatherData.weather[0].description} />
                    </div>
                )}
                {forecastData && currentSection === 'forecast' && (
                    <div id="forecast" className="forecast-info">
                        <h2>5-Day Weather Forecast for {forecastData.city.name}</h2>
                        {Object.entries(groupForecastByDay(forecastData.list)).map(([date, dailyData], index) => (
                            <div key={index} className="forecast-day">
                                <h3>{date}</h3>
                                {dailyData.map((item, index) => (
                                    <div key={index} className="forecast-item">
                                        <p>{new Date(item.dt_txt).toLocaleTimeString()}</p>
                                        <p>{item.weather[0].description}</p>
                                        <p>Temperature: {convertTemp(item.main.temp)}</p>
                                        <p>Humidity: {item.main.humidity}%</p>
                                        <p>Wind Speed: {convertWindSpeed(item.wind.speed)}</p>
                                        <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt={item.weather[0].description} />
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <footer className="footer">
                <p>&copy; {currentYear} US Weather Explorer. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default App;

