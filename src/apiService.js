export const getWeatherByCity = (city) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=4d0dd913c85c817bc3d7581e94e19270`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    });
};
