const request = require("request");

const geocode = function (address, callback) {
  const url = `https://geocode.xyz/${encodeURI(
    address
  )}?json=1&auth=294707202415885451488x70949`;
  request({ url, json: true }, (error, response, body) => {
    if (error) {
      callback("Unable to connect to location services", undefined);
    } else if (body.error) {
      callback("Unable to find to location. Try another search", undefined);
    } else {
      const { latt, longt } = body;
      const city = body.standard.city;
      callback(undefined, {
        latt,
        longt,
        city,
      });
    }
  });
};

module.exports = geocode;
