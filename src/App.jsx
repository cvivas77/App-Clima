import { useEffect, useState } from 'react';
import axios from "axios";
import './App.css';

function App() {
  const [weather, setWeather] = useState({});
  const [convertTemp, setConvertTemp] = useState(true);

  useEffect(() => {
  
  const success = pos => {
    const lat = pos.coords.latitude
    const lon = pos.coords.longitude
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=c6fd5c2dafaf9b47feaf93292015b210&units=metric`)
    .then(res => setWeather(res.data));
  }

  navigator.geolocation.getCurrentPosition(success)
    
  }, [])

  console.log(weather);

const dateBuldler = (d) => {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date  = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year} `

  
}
const convert = () => [
  setConvertTemp(!convertTemp)
]

  return (
    <div className="App">
      <div className='location-box'>
          <div className='location'>
            <h2>{weather.name}, {weather.sys?.country}</h2>
          
          <div className='date'>
            <p>{dateBuldler(new Date())}</p>
          </div>
          </div>
      </div>
      <div className='weather-box'>
        <div className='temp'>
          <h2>{convertTemp ? `${Math.floor(weather.main?.temp)} °C` : `${Math.floor((weather.main?.temp) * 9/5 + 32)} °F`}  </h2>
          <button className='btn' onClick={convert}><p>{convertTemp ? "Chance to °C" : "Chance to °F"}</p></button>
      </div>
      
    </div>
    <div className='icons'>
          <img className='img' src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="" />
          <h2>{weather.weather?.[0].description}</h2>
    </div>
    <div className='wather'>
      
        <p id='a'>Humitidy: <br /> {weather.main?.humidity} %</p>
        <p id='b'>Pressure: <br /> {weather.main?.pressure} Pa</p>
        <p id='c'>Temperature Min: <br /> {Math.floor(weather.main?.temp_min)} °C</p>
        <p id='d'>Temperature Max: <br /> {Math.floor(weather.main?.temp_max)} °C</p>
        </div>
    </div>
  )
}

export default App
