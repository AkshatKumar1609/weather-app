import React, { useState } from 'react';
import './App.css';
import { Slide, toast, ToastContainer } from 'react-toastify';

const App = () => {
  let [searchActive, setSearchActive] = useState(false);
  let [location, setLocation] = useState('');
  let [weatherData, setWeatherData] = useState();

  function getData(event) {
    event.preventDefault();

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=dae23a146709930b72d3e6482604b29f&units=metric`)
      .then((res) => res.json())
      .then((finalRes) => {
        console.log(finalRes);
        if (finalRes.cod != 404) {
          setSearchActive(false);
          setWeatherData(finalRes);
        } else {
          toast.error('Location not found');
        }
      });
    setLocation('');
  }

  return (
    <div className="weather-app">
      <div className="weather-card">
        {searchActive && (
          <form className="search-form" onSubmit={(event) => getData(event)}>
            <div className="search-input-container">
              <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Search location..."
                autoFocus
                className="search-input"
              />
              <button
                type="button"
                className="close-search"
                onClick={() => setSearchActive(false)}
              >
                ×
              </button>
            </div>
          </form>
        )}

        {/* Main Weather Content */}
        <div className={`weather-content ${searchActive ? 'search-active' : ''}`}>
          {/* Header Section */}
          <div className="weather-header">
            <div className="location-container">
              <h1 className="location">{weatherData ? weatherData.name : ''}</h1>
              <button
                className="search-toggle-button"
                onClick={() => setSearchActive(true)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </button>
            </div>
            <div className="time-date">
              <span className="time">{new Date().toLocaleTimeString()}</span>
              <span className="date">{new Date().toLocaleDateString()}</span>
            </div>
          </div>

          {weatherData ? (
            <div className="weather-main">
              <div className="weather-icon">
                <img 
                  src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} 
                  alt={weatherData.weather[0].main}
                  className="weather-icon-img"
                />
              </div>
              <div className="weather-temp">
                <h2>{Math.round(weatherData.main.temp)}°<span className="temp-scale">C</span></h2>
                <p className="condition">{weatherData.weather[0].main}</p>
                <p className="feels-like">Feels like {Math.round(weatherData.main.feels_like)}°C</p>
              </div>
            </div>
          ) : (
            <div className="no-data">Search for a location to see weather</div>
          )}

          <div className="weather-details">
            <div className="detail-item">
              <span className="detail-icon">💧</span>
              <div className="detail-text">
                <span className="detail-label">Humidity</span>
                <span className="detail-value">{weatherData ? `${weatherData.main.humidity}%` : '--'}</span>
              </div>
            </div>

            <div className="detail-item">
              <span className="detail-icon">🌬️</span>
              <div className="detail-text">
                <span className="detail-label">Wind</span>
                <span className="detail-value">{weatherData ? `${weatherData.wind.speed} m/s` : '--'}</span>
              </div>
            </div>

            <div className="detail-item">
              <span className="detail-icon">📊</span>
              <div className="detail-text">
                <span className="detail-label">Pressure</span>
                <span className="detail-value">{weatherData ? `${weatherData.main.pressure} hPa` : '--'}</span>
              </div>
            </div>

            <div className="detail-item">
              <span className="detail-icon">👁️</span>
              <div className="detail-text">
                <span className="detail-label">Visibility</span>
                <span className="detail-value">{weatherData ? `${(weatherData.visibility / 1000).toFixed(1)} km` : '--'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-left"
        autoClose={1000}
        limit={2}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Slide}
      />
    </div>
  );
};

export default App;