const key = "d04f8dbcbdee84f5c7d7c28cfce834a0"

export async function geoCoding(city) {
    const cityName = city ?? "Istanbul";
    return await (await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${key}`)).json()
}

export async function currentWeatherApi(lat, lon) {
    return await (await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=tr&units=metric&appid=${key}`)).json()
}

export async function currentWeatherPollApi(lat, lon) {
    return await (await fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&lang=tr&appid=${key}`)).json()
}

export async function fiveDaysForecastApi(lat, lon) {
    return await (await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&lang=tr&units=metric&appid=${key}`)).json()
}