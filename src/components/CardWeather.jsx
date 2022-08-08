import axios from 'axios'
import React, {useEffect, useState} from 'react'
import Loadingscreen from './LoadingScreen'


const CardWeather = ({lat,lon}) => {

const [weather,setWeather] = useState()
const [temperture,setTemperture] = useState()
const [isCelsius, setIsCelsius] =useState (true)
const [isLoading, setIsLoading] =useState(true) 
           
useEffect(() => {
        if(lat){
        const APIKey = 'c5fb29003847e0e4123030d0314e450a' 
        const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`

axios.get(URL)
 .then (res => {
     setWeather(res.data)
const temp = {
    celsius:`${Math.round(res.data.main.temp - 273.15)} °C`,
    farenheit:`${Math.round((res.data.main.temp - 273.15)* 9 / 5 + 32)} °F`
}
setTemperture(temp)
setIsLoading(false)
})
 .catch(err => console.log (err))
    }
}, [lat,lon])

console.log(weather)

const handleClick = () => setIsCelsius(!isCelsius)

if(isLoading){
    return <Loadingscreen/>
} else {
    return (
        <body background="/public/background-loader.jpeg">
        <article className='center' >
       
        
        <div className="backgro">
             <h1 className='backgroTwo' >Weather App </h1>
         <h2 className='backgroTwo'>{`${weather?.name}, ${weather?.sys.country}`} </h2>

        
        <div>
        
        
        
        <ul className='ptest'>
                <img src={weather && `http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} alt="" />
                <h3>&#34;{weather?.weather[0].description}&#34; </h3>
        <li>  <span>Wind Speed: </span>{weather?.wind.speed} m/s</li>
        <li><span>Clouds: </span>{weather?.clouds.all}%</li>
        <li><span>Pressure: </span>{weather?.main.pressure} hPa</li>
                <h2>{isCelsius ? temperture?.celsius : temperture?.farenheit}</h2>
         </ul>
<div className="backgroThree">
        <button onClick={handleClick} > {isCelsius? 'Change to °F' : 'Change to °C'} </button>
        </div>
        
        
        </div>
        </div>
       
        </article></body>
    )
}

}

export default CardWeather