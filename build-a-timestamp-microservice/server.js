// server.js
var express = require("express");
var app = express();

var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static(__dirname + "/public"));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/{:date}", function (req, res) {
    const dateString = req.params.date;
  let date;

  if (!dateString) {
    // الحالة 6 و 7: بدون باراميتر → الوقت الحالي
    date = new Date();
  } else if (/^-?\d+$/.test(dateString)) {
    // الحالة 3: رقم فقط → اعتبره milliseconds
    date = new Date(parseInt(dateString));
  } else {
    // الحالة 4: أي نص ينفع مع new Date()
    date = new Date(dateString);
  }

  // الحالة 5: تاريخ غلط
  if (isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  // الحالات 1 و 2
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

const listener = app.listen(process.env.PORT || 3001, function () {
      console.log("Your app is listening on port " + listener.address().port);
});