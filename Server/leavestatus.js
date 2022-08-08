const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const leaveStatus = require("./models/pendingleave");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

const dbUrl =
  "mongodb+srv://Admin:VIPZb498zKAImRYQ@cluster0.zvzw94r.mongodb.net/?retryWrites=true&w=majority";
const connectionParams = {
  useNewUrlParser: true,
};

mongoose
  .connect(dbUrl, connectionParams)
  .then(() => {
    console.info("connected to DB");
  })
  .catch((e) => {
    console.log("Error:", e);
  });

app.listen(3300, "127.0.0.1");
console.log("Node server running on port 3300");

app.post("/api/leavestatus", async (req, res) => {
  console.log(req.body);
  try {
    const { status, dateApplied, leaveType, fromDate, toDate, subject, description } =
      req.body;
    const leavestat = new leaveStatus({
      status,
      dateApplied,
      leaveType,
      fromDate,
      toDate,
      subject,
      description,
    });

    await leavestat.save();

    res.status(200).json({
      status: "200",
      message: "Leave sent successfully",
    });
  } catch (err) {
    res.json({ status: "error", error: err.message });
  }
});