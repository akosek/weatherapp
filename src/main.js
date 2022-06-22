import { getWeatherByCity } from "./apiService.js";
import { mapListToDOMElements } from "./DOMActions.js";

class WeatherApp {
  constructor() {
    this.viewElems = {};
    this.initializeApp();
  }

  initializeApp = () => {
    this.connectHTMLElems();
    this.setupListeners();
  };

  connectHTMLElems = () => {
    const listId = Array.from(document.querySelectorAll("[id]")).map(
      (elem) => elem.id
    );
    this.viewElems = mapListToDOMElements(listId);
  };

  setupListeners = () => {
    this.viewElems.searchInput.addEventListener("keydown", this.handleSubmit);
    this.viewElems.searchButton.addEventListener("click", this.handleSubmit);
    this.viewElems.returnSearchBtn.addEventListener("click", this.onBackClick);
  };

  handleSubmit = () => {
    if (event.type === "click" || event.key === "Enter") {
      this.viewElems.searchInput.style.borderColor = "black";
      this.fadeInOut();
      let query = this.viewElems.searchInput.value;
      getWeatherByCity(query)
        .then((data) => {
          this.displayWeatherData(data);
        })
        .catch(() => {
          this.fadeInOut();
          this.viewElems.searchInput.style.borderColor = "red";
        });
    }
  };

  fadeInOut = () => {
    if (
      this.viewElems.mainContainer.style.opacity === "1" ||
      this.viewElems.mainContainer.style.opacity === ""
    ) {
      this.viewElems.mainContainer.style.opacity = "0";
    } else {
      this.viewElems.mainContainer.style.opacity = "1";
    }
  };

  switchView = () => {
    if (this.viewElems.weatherSearchView.style.display !== "none") {
      this.viewElems.weatherSearchView.style.display = "none";
      this.viewElems.weatherForecastView.style.display = "block";
    } else {
      this.viewElems.weatherForecastView.style.display = "none";
      this.viewElems.weatherSearchView.style.display = "flex";
    }
  };

  onBackClick = () => {
    this.viewElems.searchInput.value = " ";
    this.fadeInOut();
    setTimeout(() => {
      this.switchView();
      this.fadeInOut();
      this.viewElems.searchInput.append(" ");
    }, 500);
  };

  changeToCelcius = (kelvin) => {
    var kTemp = kelvin;
    var cTemp = kTemp - 273.15;
    return cTemp.toFixed(2);
  };

  displayWeatherData = (data) => {
    this.switchView();
    this.fadeInOut();

    const weatherData = data;
    const currentTemp = this.changeToCelcius(data.main.temp);
    const minTemp = this.changeToCelcius(data.main.temp_min);
    const maxTemp = this.changeToCelcius(data.main.temp_max);

    console.log("moje Daty", weatherData);
    this.viewElems.weatherCity.innerText = data.name;
    this.viewElems.weatherCurrentTemp.innerText = currentTemp + " °C";
    this.viewElems.weatherMaxTemp.innerText = maxTemp + " °C";
    this.viewElems.weatherMinTemp.innerText = minTemp + " °C";

    this.viewElems.weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  };
}

document.addEventListener("DOMContentLoaded", new WeatherApp());
