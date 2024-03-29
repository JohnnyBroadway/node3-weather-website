const request = require("request");

const forecast = (long, lat, callback) => {
  const url = `https://api.darksky.net/forecast/4579360e13c43ffa6bb06a31883361d4/${long},${lat}?units=si`;

  request(
    {
      url,
      json: true
    },
    (error, { body }) => {
      if (error) {
        callback("Unable to connect to weather service!", undefined);
      } else if (body.error) {
        callback(body.error, undefined);
      } else {
        const degrees = body.currently.temperature,
          rainChance = body.currently.precipProbability,
          dayType = body.daily.data[0].summary,
          highTemp = body.daily.data[0].temperatureHigh,
          lowTemp = body.daily.data[0].temperatureLow;

        callback(
          undefined,
          `${dayType} It is currently ${degrees} degrees out. This high today is ${highTemp} with a low of ${lowTemp}. There is a ${rainChance}% chance of rain`
        );
      }
    }
  );
};

module.exports = forecast;
