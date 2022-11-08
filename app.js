const express = require("express");
const bodyParser = require("body-parser");
let items = [];

const app = express();

//Tells app to use ejs as its view engine
app.set('view engine', 'ejs');
// EXPRESS' built-in body parser
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
//Tells express to run these static files
app.use(express.static("public"));

app.get("/", function(req, res) {
  let today = new Date();
  let currentDay = today.getDay();

  //This variable represents the string of day that'll be passed to list.ejs

  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  //This method retreieves the date from the current local (1st param) & options
  //we specified, and replaces our previous switch.
  let day = today.toLocaleString("en-US", options);

  //This will pass what type of day the if statement determines to the list.ejs
  ///it does this by passsing thr variable as an object
  res.render("list", {
    kindOfDay: day,
    newListItems: items
  });
});

//This section of code, retrieves what the user inputs
app.post("/", function(req, res) {
  items.push(req.body.newItem);
  res.redirect("/");
});




app.listen(3000, function() {
  console.log("Server started on port 3000.");
});




//Switch to determine what day it is.
// switch (currentDay) {
//   case currentDay === 0:
//     day = "Sunday";
//     break;
//   case currentDay = 1:
//     day = "Monday";
//     break;
//   case currentDay = 2:
//     day = "Tuesday";
//     break;
//   case currentDay = 3:
//     day = "Wednesday";
//     break;
//   case currentDay = 5:
//     day = "Thursday";
//     break;
//   case currentDay = 6:
//     day = "Saturday";
//     break;
//   default:
//     console.log("Something's wrong! Current day is " + currentDay);
// }
