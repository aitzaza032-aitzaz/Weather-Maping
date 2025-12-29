import {useState,useEffect} from "react";
import "./App.css";
import axios from "axios"
function App()
{

  let [cityname, setCityname] =useState("");
  let [weather , setWeather] =useState({});
  const [cities,setCities] =useState([]);

  const handleChange = (e)=>
  {
    console.log(e.target.value)
  }

    useEffect(()=>
    {
     if(weather.current){
  alert("Data is here")
     }
   
    },[weather])






  useEffect(()=>
  {
    const fetchWeather= async ()=> {
      const cities=["Lahore Pakistan","Karachi Pakistan"]
      const weatherinfo=[]
      cities.map(async(city)=>{
        console.log(city)
        const res= await axios.get(`https://p2pclouds.up.railway.app/v1/learn/weather?city=${city}`)
        console.log(res.data)
        weatherinfo.push(res.data)
      })
      setCities(weatherinfo)
    }

    fetchWeather()
  },[])
  
 



  const handleSubmit = async (e)=>
  {
    e.preventDefault()
     
      try{
        const res= await axios.get(`https://p2pclouds.up.railway.app/v1/learn/weather?city=${cityname}`)
        setWeather(res.data)
         }
         catch (err){
          alert("something went wrong")
         }
  }

  return(
    <>
     <div>aitzaz
      <form onSubmit={handleSubmit}>
        <div>
          <div><label htmlFor="cityname">city Name</label>  </div>
          <input type="text" name="cityname" id="cityname" onChange={handleChange} />
        </div>
        <button type="submit">Get</button>
      </form>

   {weather.location && <div className="weather-card">
        <div className="card-img-container">
          <img className="card-img" src="images.jpg" alt="" />
        </div>
       <div className="card-title">
         <h1>{weather.current && weather.current.temp_c}   </h1>
       </div>
      
      <div className="card-desc">
          <p> {weather.location && weather.location.name},
           {weather.location && weather.location.region} ,
            {weather.current && weather.current.temp_c}
           </p>
      </div>
     </div>}
     </div>
   </>

  )
}
export default App;
