const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and view location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Set up static deiratory to serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Hayaaa"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Hayaaa"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Hayaaa",
    message: "This is the Help page, oh wow!"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address"
    });
  }

  geocode(req.query.address, (error, { lat, long, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(long, lat, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        forecast: forecastData,
        address: req.query.address,
        location
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 Page:",
    name: "Hayaaa",
    notFoundMsg: "Help article not found!"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404 Page:",
    name: "Hayaaa",
    notFoundMsg: "Page not found!"
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
