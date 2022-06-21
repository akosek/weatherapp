export const getWeatherByCity = (city) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=4d0dd913c85c817bc3d7581e94e19270`
  )
    .then(function (response) {
      // The response is a Response instance.
      // You parse the data into a useable format using `.json()`
      return response.json();
    })
    .then(function (data) {
      // `data` is the parsed version of the JSON returned from the above endpoint.
      console.log(data); // { "userId": 1, "id": 1, "title": "...", "body": "..." }
    });
};
