let lat, lon, weather, temperature;

function fahrenheitToCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}
function kelvinToCelsius(kelvin) {
  return kelvin - 273.15;
}
/*
async function getLocation() {
  navigator.geolocation.getCurrentPosition(async (position) => {
    lat = position.coords.latitude;
    lon = position.coords.longitude;

    const proxy_url = `/weather/${lat},${lon}`;
    const response = await fetch(proxy_url);
    const json = await response.json();

    console.log(json);
    console.log(json.weather[0].description);
    weather = json.weather[0].description;
    console.log(weather);
    temperature = kelvinToCelsius(json.main.temp).toFixed(2);
    console.log(temperature);

    const dataContainer = document.getElementById("data-container");
    dataContainer.innerHTML = ""; // Önce mevcut içeriği temizle

    const havaDurumu = document.createElement("div");
    havaDurumu.className = "havadurumu_template";
    havaDurumu.innerHTML = `
                           Lat: ${json.coord.lat}&deg<br>
                           Lon: ${json.coord.lon}&deg<br>
                           Hava Durumu: ${json.weather[0].description}<br>
                           Hava Sıcaklığı: ${kelvinToCelsius(
                             json.main.temp
                           ).toFixed(2)}&deg`;

    dataContainer.appendChild(havaDurumu);
  });
}
*/

async function getLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

const btnCheckIn = document.getElementById("btnCheckIn");

btnCheckIn.addEventListener("click", async () => {
  try {
    const position = await getLocation();
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    const proxy_url = `/weather/${lat},${lon}`;
    const response = await fetch(proxy_url);
    const json = await response.json();

    const weather = json.weather[0].description;
    const temperature = kelvinToCelsius(json.main.temp).toFixed(2);

    const data = {
      lat,
      lon,
      weather,
      temperature,
    };

    console.log(data);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const apiResponse = await fetch("/api", options);
    const apiJson = await apiResponse.json();

    console.log(apiJson);
    const weatherInfo = document.getElementById("weatherInfo");
    weatherInfo.innerHTML = `
                           Lat: ${json.coord.lat}&deg<br>
                           Lon: ${json.coord.lon}&deg<br>
                           Hava Durumu: ${json.weather[0].description}<br>
                           Hava Sıcaklığı: ${kelvinToCelsius(
                             json.main.temp
                           ).toFixed(2)}&deg`;

    // Diğer işlemler...
  } catch (error) {
    console.error("Hata:", error);
  }
});
/*
btnCheckIn.addEventListener("click", async () => {
  getLocation();
  console.log(lat, lon, weather, temperature);
  try {
    const data = {
      lat,
      lon,
      weather,
      temperature,
    };

    console.log(data);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch("/api", options);
    const json = await response.json();
    console.log(json);
  } catch (err) {
    console.error("hata", err);
  }
});
*/
