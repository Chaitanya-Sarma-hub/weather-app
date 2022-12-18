const path = require("path");
const express = require("express");
const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");

const app = express();
var hbs = require("hbs");

// define paths for Express Config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Chaitanya",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Chaitanya",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Chaitanya",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query?.address) {
    return res.send({
      error: "Please provide an address to search",
    });
  }

  geocode(req.query.address, (error, { latt, longt, city } = {}) => {
    if (error) return res.send({ error });
    forecast(latt, longt, (error, forecastData) => {
      if (error) return res.send({ error });
      return res.send({
        forecast: forecastData,
        city,
        address: req.query.address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "Help article not found",
    name: "Chaitanya",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "Page not found",
    name: "Chaitanya",
  });
});

app.listen(5050, () => {
  console.log("Listening on port 5050");
});
