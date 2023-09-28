const url = "https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "7c3a3df4a5msh548f42319ac7166p11ba78jsn8eedcb3ca395",
    "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
  },
};
function timeZone(time) {
  const sunriseTimestamp = time;

  const sunriseDate = new Date(sunriseTimestamp * 1000);

  sunriseDate.setUTCHours(sunriseDate.getUTCHours() + 5);
  sunriseDate.setUTCMinutes(sunriseDate.getUTCMinutes() + 30);

  const hours = sunriseDate.getUTCHours();
  const minutes = sunriseDate.getUTCMinutes();
  const seconds = sunriseDate.getUTCSeconds();

  // Format the time in 24-hour format (HH:MM:SS)
  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  console.log(formattedTime);
  return formattedTime;
}

const weatherInfo = async (city) => {
  try {
    cityName.innerHTML = city;
    const response = await fetch(url + city, options);
    const result = await response.json();
    temp.innerHTML = result.temp;
    temp2.innerHTML = result.temp;
    feels_like.innerHTML = result.feels_like;
    humidity.innerHTML = result.humidity;
    humidity2.innerHTML = result.humidity;
    min_temp.innerHTML = result.min_temp;
    max_temp.innerHTML = result.max_temp;
    wind_speed.innerHTML = result.wind_speed;
    wind_speed2.innerHTML = result.wind_speed;
    wind_degrees.innerHTML = result.wind_degrees;
    sunrise.innerHTML = timeZone(result.sunrise);
    sunset.innerHTML = timeZone(result.sunset);
  } catch (error) {
    alert("Please Enter Correct Location");
    console.error(error);
  }
};

submit.addEventListener("click", (e) => {
  e.preventDefault();
  weatherInfo(search.value);
});
weatherInfo("Delhi");

const common = ["Ghazipur", "Varanasi", "Lucknow", "Kolkata"];
let temps = [];

async function fetchWeatherData(city) {
  const response = await fetch(url + city, options);
  const result = await response.json();
  return result;
}

async function fetchDataForCommonCities() {
  const promises = common.map((city) => fetchWeatherData(city));
  temps = await Promise.all(promises);
  console.log(temps);
  console.log(temps.length);
  // You can now work with the 'temps' array here
  for (let i = 0; i < common.length; i++) {
    // Assuming you have HTML elements with IDs like "Ghazipur-temp", "Varanasi-temp", etc.
    const cityName = common[i];
    document.getElementById(cityName + "cloud_pct").innerHTML =
      temps[i].cloud_pct;
    document.getElementById(cityName + "temp").innerHTML = temps[i].temp;
    document.getElementById(cityName + "feels_like").innerHTML =
      temps[i].feels_like;
    document.getElementById(cityName + "humidity").innerHTML =
      temps[i].humidity;
    document.getElementById(cityName + "min_temp").innerHTML =
      temps[i].min_temp;
    document.getElementById(cityName + "max_temp").innerHTML =
      temps[i].max_temp;
    document.getElementById(cityName + "wind_speed").innerHTML =
      temps[i].wind_speed;
    document.getElementById(cityName + "wind_degrees").innerHTML =
      temps[i].wind_degrees;
    document.getElementById(cityName + "sunrise").innerHTML = timeZone(
      temps[i].sunrise
    );
    document.getElementById(cityName + "sunset").innerHTML = timeZone(
      temps[i].sunset
    );

    console.log(temps[i].temp);
    console.log("hello");
  }
}

fetchDataForCommonCities();
