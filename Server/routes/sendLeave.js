const express = require("express");
const appLeav = require("../emails/appLeav");
const leaveApply = require("../models/leaveapply");

const { sendEmail } = require("../emailService");

const Router = express.Router();

Router.post("/api/leaveApply", async (req, res) => {
  try {
    const {
        dateApplied,
        leaveType,
        fromDate,
        toDate,
        subject,
        description,
        managerEmail
    } = req.body;

    console.log("leave", req.body)
    const leave = new leaveApply({
        dateApplied,
        leaveType,
        fromDate,
        toDate,
        subject,
        description,
    });

    await leave.save();

    const mailOptions = {
      to: managerEmail,
      subject: "LEAVE APPLICATION",
      html: appLeav(leaveType, fromDate, toDate, subject, description),
    };

    await sendEmail(mailOptions);

  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: err.message });
  }
});
Router.get("/api/leaveApply",async (req, res) =>{
    leaveApply.find()
   .then(result=>{
     res.status(200).json({
       leave:result
     });
   })
   .catch(err=>{
     console.log(err);
     res.status(500).json({
       error:err
     })
   })
  })

module.exports = Router;
