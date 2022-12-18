const request = require("request");

const forecast = function (lat, lng, callback) {
  const url = `http://api.weatherstack.com/current?access_key=00fc263e1615ea46de4a7061f03ba1bf&query=${lat},${lng}`;

  request({ url, json: true }, function (error, response, body) {
    if (error) {
      callback("Unable to connect to server", undefined);
    } else if (body.error) {
      callback("Unable to find location. Please try again", undefined);
    } else {
      const data = body.current;
      //   console.log(data);
      callback(
        undefined,
        `${data.weather_descriptions[0]}. It is currently ${data.temperature} degrees and feels like ${data.feelslike} degrees`
      );
    }
  });
};

module.exports = forecast;
