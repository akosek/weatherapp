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

  viewElems.weatherCityContainer = getDOMElem("weatherCityContainer");
  viewElems.weatherCity = getDOMElem("weatherCity");
  viewElems.weatherIcon = getDOMElem("weatherIcon");

  viewElems.weatherCurrentTemp = getDOMElem("weatherCurrentTemp");
  viewElems.weatherMaxTemp = getDOMElem("weatherMaxTemp");
  viewElems.weatherMinTemp = getDOMElem("weatherMinTemp");
};

const setupListeners = () => {
  viewElems.searchInput.addEventListener("keydown", onEnterSubmit);
  viewElems.returnSearchBtn.addEventListener("click", onClickSubmit);
};

const initializeApp = () => {
  connectHTMLElems();
  setupListeners();
};

const onEnterSubmit = (event) => {
  console.log(viewElems.searchInput.value);
  if (event.key === "Enter") {
    let query = viewElems.searchInput.value;
    getWeatherByCity(query);
  }
};
const onClickSubmit = () => {};

document.addEventListener("DOMContentLoaded", initializeApp);
