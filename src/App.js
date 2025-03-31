import React, { useState } from 'react';
import './App.css';

const App = () => {
  let [searchActive, setSearchActive] = useState(false);
  let [location, setLocation] = useState('');
  let [weatheData,setWeatheData] = useState()


  // Sample data for design purposes
  const weatherData = {
    temp: 72,
    condition: "Sunny",
    time: "2:30 PM",
    date: "June 15, 2023",
    humidity: 65,
    wind: 8,
    feelsLike: 74,
    pressure: 1012,
    visibility: 10,
    icon: "☀️",
    bgGradient: "linear-gradient(135deg, #72b5f7 0%, #e0c3fc 100%)"
  };

  function getData(event){
    event.preventDefault();

    fetch('url')
    .then((res)=>res.json())
    .then((finalRes)=>{
      console.log(finalRes);
      if(finalRes.code !== 404){
        setWeatheData(finalRes);
      }
      else{
        alert('invalid data')
      }
    })

    setLocation('')
  }

  return (
    <div className="weather-app" style={{ background: weatherData.bgGradient }}>
      <div className="weather-card">
        {/* Search Bar */}
        {searchActive && (
          <form className="search-form" onSubmit={(event)=>getData(event)}>
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
              <h1 className="location">{location}</h1>
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
              <span className="time">{weatherData.time}</span>
              <span className="date">{weatherData.date}</span>
            </div>
          </div>
          
          {/* Current Weather Display */}
          {
            (weatheData)?
            <div className="weather-main">
            <div className="weather-icon">
              <span className="icon">{weatherData.icon}</span>
            </div>
            <div className="weather-temp">
              <h2>{weatherData.temp}°<span className="temp-scale">F</span></h2>
              <p className="condition">{weatherData.condition}</p>
              <p className="feels-like">Feels like {weatherData.feelsLike}°</p>
            </div>
          </div>
          :
            "No data"
          }
          
          {/* Weather Details Grid */}
          <div className="weather-details">
            <div className="detail-item">
              <span className="detail-icon">💧</span>
              <div className="detail-text">
                <span className="detail-label">Humidity</span>
                <span className="detail-value">{weatherData.humidity}%</span>
              </div>
            </div>
            
            <div className="detail-item">
              <span className="detail-icon">🌬️</span>
              <div className="detail-text">
                <span className="detail-label">Wind</span>
                <span className="detail-value">{weatherData.wind} mph</span>
              </div>
            </div>
            
            <div className="detail-item">
              <span className="detail-icon">📊</span>
              <div className="detail-text">
                <span className="detail-label">Pressure</span>
                <span className="detail-value">{weatherData.pressure} hPa</span>
              </div>
            </div>
            
            <div className="detail-item">
              <span className="detail-icon">👁️</span>
              <div className="detail-text">
                <span className="detail-label">Visibility</span>
                <span className="detail-value">{weatherData.visibility} mi</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;