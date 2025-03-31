import React, { useState } from 'react';
import './App.css';

const App = () => {
  let [searchActive, setSearchActive] = useState(false);
  let [location, setLocation] = useState('');
  let [weatheData,setWeatheData] = useState()

  function getData(event){
    event.preventDefault();

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=dae23a146709930b72d3e6482604b29f&units=metric`)
    .then((res)=>res.json())
    .then((finalRes)=>{
      console.log(finalRes);
      if(finalRes.cod != 404){
        setWeatheData(finalRes);
        setSearchActive(false)
      }
      else{
        setWeatheData()
        alert('invalid data')
      }
    })
    setLocation('')
  }

  return (
    <div className="weather-app">
      <div className="weather-card">
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

        <div className={`weather-content ${searchActive ? 'search-active' : ''}`}>
          <div className="weather-header">
            <div className="location-container">
              <h1 className="location">{weatheData ? weatheData.name : ''}</h1>
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

          {
            (weatheData)?
            <div className="weather-main">
            <div className="weather-icon">
              <span className="icon">
                <img src={`http://openweathermap.org/img/w/${weatheData.weather[0].icon}.png`} style={{width:'200%'}}/>
              </span>
            </div>
            <div className="weather-temp">
              <h2>{weatheData?weatheData.main.temp:''}°<span className="temp-scale">C</span></h2>
              <p className="condition">{weatheData?weatheData.weather[0].main:''}</p>
              <p className="feels-like">Feels like {weatheData?weatheData.main.feels_like:''}°C</p>
            </div>
          </div>
          :
            ""
          }
          
          <div className="weather-details">
            <div className="detail-item">
              <span className="detail-icon">💧</span>
              <div className="detail-text">
                <span className="detail-label">Humidity</span>
                <span className="detail-value">{weatheData?`${weatheData.main.humidity} %`:'N/A'}</span>
              </div>
            </div>
            
            <div className="detail-item">
              <span className="detail-icon">🌬️</span>
              <div className="detail-text">
                <span className="detail-label">Wind</span>
                <span className="detail-value">{weatheData?`${weatheData.wind.speed} m/s`:'N/A'} </span>
              </div>
            </div>
            
            <div className="detail-item">
              <span className="detail-icon">📊</span>
              <div className="detail-text">
                <span className="detail-label">Pressure</span>
                <span className="detail-value">{weatheData?`${weatheData.main.pressure} hPa`:'N/A'}</span>
              </div>
            </div>
            
            <div className="detail-item">
              <span className="detail-icon">👁️</span>
              <div className="detail-text">
                <span className="detail-label">Visibility</span>
                <span className="detail-value">{weatheData?`${weatheData.visibility/1000} km`:'N/A'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;