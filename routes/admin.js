const express = require("express");
const User = require("../models/User");
const Programs = require("../models/Programs");
const bcrypt = require("bcryptjs");
const sendEmail = require("../services/mailIntegrationService");
const router = express.Router();

router.get("/getUsers", async (req, res) => {
  let user = await User.find({ role: "student" });
  res.json(user);
});

router.get("/getPrograms", async (req, res) => {
  let progrmas = await Programs.find({});
  res.json(progrmas);
});

router.post("/createUser", async (req, res) => {
  let subject = "Welcome to Opal Mentoring Application  ✔";

  let body = `Hi ${req.body.firstName} ${req.body.lastName},

    Your account has been successfully registered!!! Please use the following credentials to login.
    E-Mail : ${req.body.email}
    Password: ${req.body.password}
    
    Happy Learning!!`;

  try {
    // Check whether the user with this email exists already
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.json({ error: "Sorry a user with this email already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    user = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: secPass,
      email: req.body.email,
      mentor: req.body.mentor,
      programs: req.body.programs,
      role: "student",
      programList: req.body.programList,
    });

    // res.json(user)
    //sendEmail(req.body.email);
    // const val = await sendEmail(req.body.email, subject, body);
    sendEmail(req.body.email, subject, body);

    res.json("success");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/deleteUser", async (req, res) => {
  let user = await User.findByIdAndDelete({ _id: req.query._id });
  res.json(user);
});

router.post("/updateUser", async (req, res) => {
  let user = await User.findByIdAndUpdate(
    { _id: req.body.userId },
    {
      programs: req.body.programs,
      mentor: req.body.mentor,
      programList: req.body.programList,
    }
  );
  res.json(user);
});

module.exports = router;
