require("dotenv").config();
API_KEY = process.env.API_KEY;

const getweatherinfo = async (city = "michigan") => {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${API_KEY}&q=${city}&units=imperial`
  );
  const weather = await response.json();
  return weather;
};

module.exports = getweatherinfo;
