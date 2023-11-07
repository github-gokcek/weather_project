const express = require("express");
const Datastore = require("nedb");
require("dotenv").config();
database = new Datastore({
  filename:
    "C:\\Users\\twthu\\OneDrive\\Masaüstü\\Ders\\VS_Projeler\\weather_project\\db\\database.db",
});
database.loadDatabase();
const app = express();
app.use(express.json({ limit: "1mb" }));
port = 2020;
app.use(express.static("public"));
app.listen(port, () => {
  console.log(`Sunucu ${port} numaralı portta çalışıyor`);
});

app.get("/xd", (req, res) => {
  database.find({}, (err, docs) => {
    if (err) {
      res.status(500).send("Internal Server Error");
    } else {
      res.json(docs);
    }
  });
});

app.post("/api", (req, res) => {
  const data = req.body;
  console.log(data);
  database.insert(data);

  res.json(data);
  console.log("eklendi.");
});

app.get("/weather/:latlon", async (req, res) => {
  const latlon = req.params.latlon.split(",");
  const lat = latlon[0];
  const lon = latlon[1];
  const API_KEY = process.env.API_KEY;
  const lang = "tr";
  const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=${lang}`;
  const response = await fetch(URL);
  const json = await response.json();
  res.json(json);
});
