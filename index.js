const express = require("express");
const path = require("path");
const getweatherinfo = require("./getweather");
const exphbs = require("express-handlebars");
const Mailgun = require("mailgun.js");
const formData = require("form-data");
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

// Configure template Engine and Main Template File
app.engine(
  "hbs",
  exphbs.engine({
    defaultLayout: "main",
    extname: ".hbs",
  })
);
// Setting template Engine
app.set("view engine", "hbs");
let year = new Date().getFullYear();
fakeApi = () => "Faker";
const API_KEY = "89898d279d982ed0edc030d1ac6a7158-063062da-b6a08e6f";
const DOMAIN = "sandbox31b4f3bc21a34b7b9b43a0f06f54df28.mailgun.org";

//import formData from 'form-data';
//import Mailgun from 'mailgun.js';

const mailgun = new Mailgun(formData);
const client = mailgun.client({ username: "api", key: API_KEY });

// const messageData = {
//   from: "Excited User <emekanwobu2018@gmail.com>",
//   to: "emekanwobu2018@gmail.com",
//   subject: "Hello",
//   html: `<a href="www.google.com">Google</a>`,
// };

// client.messages
//   .create(DOMAIN, messageData)
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.error(err);
//   });

// routes

app.get("/", (req, res) => {
  res.render("home", { msg: "Thanks", year });
});
app.get("/about-us", (req, res) => {
  res.render("about-us", { year });
});
app.get("/getweather/", (req, res) => {
  let city = req.query.city;
  let email = req.query.email;
  //let city = req.params.city;
  let cit = req.query.cl;
  if (city.trim() == "") {
    city = "Awka";
  }
  console.log("cit", cit);

  if (email.trim() == "") {
    email = "emekanwobu2018@gmail.com";
  }
  const bb = async () => {
    cc = await getweatherinfo(city);
    if (cc.cod !== "200") {
      return res.render("city not found", { city: city, year });
    }
    //console.log("checkbox value:", cit);
    console.log(cc);
    console.log(cc.list[0].main);
    console.log(cc.city.name);
    //res.send(cc);
    ///////////
    const messageData = {
      from: "Excited User <emekanwobu2018@gmail.com>",
      to: email,
      subject: "Hello",
      //text: cc.list[0].weather[0].description,
      html: ` The weather condition of <spa>${cc.city.name}</span> are as follows:<br>
             Description: <b>${cc.list[0].weather[0].description}:<br>
             Temperature: ${cc.list[0].main.temp}`,
    };
    if (cit) {
      client.messages
        .create(DOMAIN, messageData)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.error(err);
        });
    }

    /////
    res.render("weather", {
      description: cc.list[0].weather[0].description,
      Temperature: cc.list[0].main.temp,
      city: cc.city.name,
      year,
    });
  };
  bb();
});

// port where app is served
app.listen(3000, () => {
  console.log("The web server has started on port 3000");
});
