"use client"
import { BiSolidLeaf, BiSearch } from "react-icons/bi";
import { useEffect, useState } from "react";
import { geoCoding, currentWeatherApi, currentWeatherPollApi, fiveDaysForecastApi } from "@/helpers/ApiHelpers";

export const dynamic = 'force-dynamic'


export default function Home() {
  const [city, setCity] = useState("istanbul");
  const [currentWeather, setCurrentWeather] = useState(null);
  const [currentWeatherPool, setCurrentWeatherPool] = useState(null)
  const [fiveDaysForecast, setFiveDaysForecast] = useState([]);
  const [show, setShow] = useState(false);

  async function handleSearch() {
    try {
      const geoData = await geoCoding(city);

      if (geoData.code !== "400" && geoData.length > 0) {
        const lon = geoData[0].lon;
        const lat = geoData[0].lat;

        const cwData = await currentWeatherApi(lat, lon);
        const cwpData = await currentWeatherPollApi(lat, lon)
        const cwfData = await fiveDaysForecastApi(lat, lon)

        setCurrentWeather(cwData);
        setCurrentWeatherPool(cwpData.list[0].main.aqi)
        setFiveDaysForecast(cwfData.list)
        console.log(cwfData.list)

      } else {
        console.error("Şehir bilgisi bulunamadı.");
      }
    } catch (error) {
      console.error("API çağrısı sırasında bir hata oluştu:", error);
    }
  }

  useEffect(() => {
    handleSearch()
  }, [city]);

  return (
    <section className="grid md:grid-cols-2 max-w-screen-xl mx-auto px-1 gap-y-10 md:gap-x-10">

      <div className="col-span-full mx-auto mb-10 relative">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Şehir Ara"
          className="rounded-md font-semibold bg-transparent text-white w-full p-1 border-b border-teal-600 focus:outline-none focus:border-b-2 focus:border-teal-500"
        />
        <button onClick={handleSearch}>
          <BiSearch className="absolute top-2 right-1 text-xl font-bold text-teal-500" />
        </button>
      </div>

      {/* Mevcut Hava Durumu */}
      <div className="text-center rounded-lg h-fit  p-10 bg-[url('https://cdn1.ntv.com.tr/gorsel/33zcTShTfkCxr22gDaMvbA.jpg?width=952&height=540&mode=both&scale=both')]">
        {currentWeather && (
          <>
            <h1 className="text-white text-3xl font-bold w-full">{city} , {currentWeather?.sys?.country} </h1>
            <div className="mt-10 text-white">
              <h3 className="text-5xl font-bold mb-2">
                {Math.round(currentWeather.main.temp)}°C
              </h3>
              <p className="font-bold text-md">
                {currentWeather.weather[0].description}
                <span className="ms-2">{Math.round(currentWeather.main.temp_min)} / {Math.round(currentWeather.main.temp_max)} </span>
              </p>
              <div className="flex justify-between items-center font-mono mt-5 sm:w-2/3 mx-auto">
                <div className="text-start">
                  <p>Rüzgar:</p>
                  <p>Nem:</p>
                  <p>Hissedilen:</p>
                  <p>Basınç:</p>
                </div>
                <div className="text-end">
                  <p>{currentWeather.wind.speed} km/h</p>
                  <p>{currentWeather.main.humidity} %</p>
                  <p>{currentWeather.main.feels_like} °C</p>
                  <p>{currentWeather.main.pressure} hpa</p>
                </div>
              </div>

              <div className={`p-2 flex items-center justify-center ${currentWeatherPool < 3 ? "bg-teal-400" : (currentWeatherPool === 3 ? "bg-yellow-400" : "bg-red-400")} bg-opacity-50 rounded-full w-fit mx-auto mt-5`}>
                <BiSolidLeaf />
                <p className=" font-mono">
                  HKE {currentWeatherPool}
                </p>
              </div>
              <p className="font-mono text-sm">
                "{currentWeatherPool < 3 ? "Yürüyüş için harika bir gün" : (currentWeatherPool === 3 ? "Hava Biraz Kirli" : "Hava Çok kirli")}"
              </p>
            </div>
          </>
        )}
      </div>

      {/* 5 günlük tahmin  */}
      <div className="text-center rounded-lg  text-white">
        <h1 className="text-2xl font-bold">5 günlük 3 saat Aralıklı Tahminler </h1>
        <button 
        onClick={()=>setShow(!show)}
        className="p-2 rounded-md border-b bg-sky-900 bg-opacity-20 border-sky-500 mb-5">{show ? "Gizle":"Göster"}</button>
        {show &&
          <div className="grid grid-cols-1 gap-y-10">
            {
              fiveDaysForecast.map((fcast, index) => (
                <div key={index} className="flex justify-between text-sm items-center bg-gradient-to-l from-blue-900 to-teal-600 bg-opacity-50 rounded-md py-3 px-3 font-bold">
                  <h3>  {fcast.dt_txt} | <span className="font-mono">{fcast.weather[0].description}</span></h3>
                  <p>{Math.round(fcast.main.temp_min)}°C / {Math.round(fcast.main.temp_max)}°C</p>
                </div>
              ))
            }
          </div>
        }
      </div>
    </section >
  );
}
