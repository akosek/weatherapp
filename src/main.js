import { getWeatherByCity } from "./apiService.js";

const viewElems = {};

const getDOMElem = (id) => {
  return document.getElementById(id);
};

const connectHTMLElems = () => {
  viewElems.mainContainer = getDOMElem("mainContainer");
  viewElems.weatherSearchView = getDOMElem("weatherSearchView");
  viewElems.weatherForecastView = getDOMElem("weatherForecastView");

  viewElems.searchInput = getDOMElem("searchInput");
  viewElems.returnSearchBtn = getDOMElem("returnSearchBtn");
  viewElems.searchButton = getDOMElem("searchButton");

  viewElems.weatherCityContainer = getDOMElem("weatherCityContainer");
  viewElems.weatherCity = getDOMElem("weatherCity");
  viewElems.weatherIcon = getDOMElem("weatherIcon");

  viewElems.weatherCurrentTemp = getDOMElem("weatherCurrentTemp");
  viewElems.weatherMaxTemp = getDOMElem("weatherMaxTemp");
  viewElems.weatherMinTemp = getDOMElem("weatherMinTemp");
};

const setupListeners = () => {
  viewElems.searchInput.addEventListener("keydown", onEnterSubmit);
  viewElems.searchButton.addEventListener("click", onClickSubmit);
  viewElems.returnSearchBtn.addEventListener("click", onBackClick);
};

const initializeApp = () => {
  connectHTMLElems();
  setupListeners();
};

const onEnterSubmit = (event) => {
  if (event.key === "Enter") {
    fadeInOut();
    let query = viewElems.searchInput.value;
    getWeatherByCity(query).then((data) => {
      displayWeatherData(data);
    });
  }
};
const onClickSubmit = () => {
  fadeInOut();
  let query = viewElems.searchInput.value;
  getWeatherByCity(query).then((data) => {
    displayWeatherData(data);
  });
};

const fadeInOut = () => {
  if (
    viewElems.mainContainer.style.opacity === "1" ||
    viewElems.mainContainer.style.opacity === ""
  ) {
    viewElems.mainContainer.style.opacity = "0";
  } else {
    viewElems.mainContainer.style.opacity = "1";
  }
};

const switchView = () => {
  if (viewElems.weatherSearchView.style.display !== "none") {
    viewElems.weatherSearchView.style.display = "none";
    viewElems.weatherForecastView.style.display = "block";
  } else {
    viewElems.weatherForecastView.style.display = "none";
    viewElems.weatherSearchView.style.display = "flex";
  }
};

const onBackClick = () => {
  fadeInOut();
  setTimeout(() => {
    switchView();
    fadeInOut();
    viewElems.searchInput.append(" ");
  }, 500);
};

const changeToCelcius = (kelvin) => {
  var kTemp = kelvin;
  var cTemp = kTemp - 273.15;
  return cTemp.toFixed(2);
};

const displayWeatherData = (data) => {
  switchView();
  fadeInOut();

  const weatherData = data;
  console.log("moje Daty", weatherData);
  viewElems.weatherCity.innerText = data.name;
  viewElems.weatherCurrentTemp.innerText =
    changeToCelcius(data.main.temp) + " °C";
  viewElems.weatherMaxTemp.innerText =
    changeToCelcius(data.main.temp_max) + " °C";
  viewElems.weatherMinTemp.innerText =
    changeToCelcius(data.main.temp_min) + " °C";

  viewElems.weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
};

document.addEventListener("DOMContentLoaded", initializeApp);
