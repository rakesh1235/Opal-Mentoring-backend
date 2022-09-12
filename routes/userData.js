const express = require("express");
const User = require("../models/User");
const router = express.Router();


router.get("/getPrograms", async (req, res) => {
    
    try {
    let user = await User.findOne({userId:req.query.userID});

      res.json(user.programs)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  });


  module.exports = router;