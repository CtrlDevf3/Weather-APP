'use client';
import React, { useState } from "react";

export default function Home() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)

  const weatherIcons = {
    Clear: "/clear.png",
    Clouds: "/cloud.png",
    Drizzle: "/drizzle.png",
    Rain: "/rain.png",
    Snow: "/snow.png",
  };
  const handleChange = (e) => setCity(e.target.value)
  const handleSearch = async () => {
    if (city === '') return
    const apikey = "fc4a03cd5f9710429a67f41f4411acbd"; // replace with your OpenWeatherMap key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`;
    try {
      const res = await fetch(url)
      const data = await res.json()
      if (data.cod === 200) {
        setWeather({
          name: data.name,
          temp: Math.round(data.main.temp),
          description: data.weather[0].description,
          wind: data.wind.speed,
          main: data.weather[0].main,
          humidity: data.main.humidity,
          feels: data.main.feels_like
        })
      } else {
        alert('City not found' || data.message)
        setWeather(null)
      }
    } catch (error) {
      alert('Data fetching error')
      setWeather(null)
    }
    setCity('')
  }

  return (
    <div className="min-h-screen flex items-center justify-center font-['Segoe_UI',sans-serif] bg-gradient-to-br from-[#0b1220] via-[#0f2a1f] to-[#1e4620]">
      <div className="w-full max-w-[460px] rounded-2xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.4)] bg-white/10 backdrop-blur-xl border border-white/20">

        {/* Title */}
        <h1 className="text-[30px] font-semibold mb-5 text-white tracking-wide">
          Weather
          <span className="text-green-400">Now</span>
        </h1>

        {/* Search */}
        <div className="flex gap-3">
          <input
            value={city}
            onChange={handleChange}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            type="text"
            placeholder="Search city"
            className="flex-1 px-5 py-3 text-base rounded-full bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          />
          <button
            onClick={handleSearch}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full text-base transition shadow-lg shadow-green-500/30"
          >
            GO
          </button>
        </div>

        {/* Weather Card */}
        {weather && (

          <div className="mt-8 p-6 rounded-2xl bg-white/15 backdrop-blur-2xl border border-white/20 text-center animate-fadeIn hover:scale-[1.02] transition-transform duration-500">

            <h2 className="text-2xl font-semibold text-white tracking-wide">{weather.name}</h2>

            {/* Main Weather Icon */}
            <img
              src={weatherIcons[weather.main]}
              alt={weather.description}
              className="w-20 h-20 mx-auto mt-3"
            />

            <p className="text-[56px] font-bold text-green-400 mt-3 drop-shadow-lg">
              {weather.temp}  °</p>
            <p className="text-lg text-white/80 mt-1 capitalize"></p>

            <div className="h-px w-full bg-white/20 my-6" />

            {/* Weather Details with small icons */}
            <div className="grid grid-cols-3 gap-4 text-white">

              <div className="hover:text-green-400 transition flex flex-col items-center gap-1">
                <p className="text-xs uppercase tracking-wider opacity-70">Humidity</p>
                <div className="flex items-center gap-1">
                  <img src="/humidity.png" alt="humidity" className="w-5 h-5" />
                  <span className="text-lg font-semibold">{weather.humidity}</span>
                </div>
              </div>

              <div className="hover:text-green-400 transition flex flex-col items-center gap-1">
                <p className="text-xs uppercase tracking-wider opacity-70"></p>
                <div className="flex items-center gap-1">
                  <img src="/wind.png" alt="wind" className="w-5 h-5" />
                  <span className="text-lg font-semibold">{weather.wind}km/h</span>
                </div>
              </div>

              <div className="hover:text-green-400 transition flex flex-col items-center gap-1">
                <p className="text-xs uppercase tracking-wider opacity-70">Feels</p>
                <div className="flex items-center gap-1">
                  <span className="text-lg font-semibold">{weather.feels}°</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
