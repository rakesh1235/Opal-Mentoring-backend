const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcryptjs");
const sendEmail = require("../services/mailIntegrationService");
var jwt = require("jsonwebtoken");

const JWT_SECRET = "OpalMentoringApplicationBuiltByRakesh";

// ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required
router.post("/createuser", async (req, res) => {
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

// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required
router.post("/login", async (req, res) => {
  let success = false;
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      success = false;
      return res.json({
        error: "Please try to login with correct credentials",
      });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      success = false;
      return res.json({
        success,
        error: "Please try to login with correct credentials",
      });
    }

    const data = {
      user: {
        id: user.id,
      },
    };
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({ success, authtoken, userName: `${user.firstName} ${user.lastName}`, userId:user._id, role:user.role });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
