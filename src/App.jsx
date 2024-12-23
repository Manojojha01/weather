import React, {useEffect, useState } from 'react'
import './App.css'
import SearchIcon from '@mui/icons-material/Search';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import DehazeIcon from '@mui/icons-material/CloudQueue';
import BrightnessMediumIcon from '@mui/icons-material/BrightnessMedium';
import WbSunnyIcon from '@mui/icons-material/WbSunny';


let WEATHER_API_KEY=import.meta.env.VITE_PUBLIC_WEATHER_API_KEY;


const App = () => {

  const [place, setPlace] = useState("madhya pradesh")
  const [placeData , setPlaceData] = useState(null)
 // const [placeData , setPlaceData] = useState({})
const currentTime =new Date().toLocaleDateString([],{
  hour:'2-digit',
  minute:'2-digit',
 // hour12:true
})


  const getWeatherData = async ()=>{
   // https://api.openweathermap.org/data/2.5/weather?q=jabalpur&appid=bf152342810a23ec511a26165f5a6ef8
if(place&&place.length>0){
  try{
    let url =`https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${WEATHER_API_KEY}`
    let res = await fetch(url);
    let data =await res.json();
    console.log("GET WEATHER DATA RESPONCE \n",data)
    setPlaceData(data)
  }
  catch(err){
    console.log(err)
  }
}   
  }
  
 useEffect(() => {
  getWeatherData();
 }, [])
 
  
  return (
    <div className='outerdiv'>
      <div className="searchbar">
        <input type="search" placeholder='Ctiy name'
         onChange={(e)=>setPlace(e.target.value)} />
         <button onClick={getWeatherData}><SearchIcon className='button' /></button>
      </div>
{
  placeData && <div className="row">
    <div className="section1">
      <div className="section11">
        {
          placeData.weather[0].main === 'Clouds' && 
          <CloudQueueIcon  className='weathericon'/>
        }
         {
      placeData.weather[0].main === 'Haze' && 
      <DehazeIcon  className='weathericon' />
     }
     {
      placeData.weather[0].main === 'Smoke' && 
      <BrightnessMediumIcon  className='weathericon' />
     }
      {
      placeData.weather[0].main === 'Clear' && 
      <WbSunnyIcon  className='weathericon' />
     }
     <p className="temp"> {(placeData?.main.temp -273.15).toFixed(1)} <span>°C</span> </p>
      </div>
      <div className="section11">
        <p className="city">{placeData?.name}</p>
        <p className="weathertype"> {placeData?.weather[0].main} </p>
      </div>
    </div>
    <div className="timediv">
      <div className="time"> {currentTime} </div>
    </div>
  </div> 
}
{
  placeData && <div className="section2">
    <div className="section21">
      <p className="head1">Temperature</p> 
      <p className="head2" > {(placeData?.main.temp -273.15).toFixed(1)} °C</p>
    </div>
    <div className="section21">
      <p className="head1">Temperature Min</p> 
      <p className="head2" > {(placeData?.main.temp -273.15).toFixed(1)} °C</p>
    </div>
    <div className="section21">
      <p className="head1">Temperature Max</p>
      <p className="head2" > {(placeData?.main.temp -273.15).toFixed(1)} °C</p>
    </div>
    <div className='section21'>
            <p className='head1'>Humidity</p> 
            <p className='head2'>{placeData?.main.humidity}</p>
          </div>
    <div className='section21'>
            <p className='head1'>pressure</p>
            <p className='head2'>{placeData?.main.pressure}</p>
          </div>
    <div className='section21'>
            <p className='head1'>Visibility</p>
            <p className='head2'>{placeData?.visibility}</p>
          </div>
    <div className='section21'>
            <p className='head1'>Wind Speed</p>
            <p className='head2'>{placeData?.wind.speed} km/hr</p>
          </div>
  </div>
  }
</div>
    
  


      
         
            
        
  )
}

export default App
