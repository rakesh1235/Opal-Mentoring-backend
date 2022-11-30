const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.get("/getPrograms", async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.query.userID });

    res.json(user.programs);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/getTechnologies", async (req, res) => {
  try {
    let user = await User.findOne(
      { _id: req.query.userID, "programs.programId": req.query.programId },
      "programs.$"
    );

    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/getSections", async (req, res) => {
  try {
    let user = await User.findOne(
      {
        _id: req.query.userID,
        "programs.programId": req.query.programId,
        "programs.technologies": {
          $elemMatch: {
            technologyId: req.query.technologyId,
          },
        },
      }, "programs.$"
      
    );

    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/updateSectionStatus", (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.body.id },
    { $set: { "programs.$[j].technologies.$[i].sections": req.body.sections } },
    {
      arrayFilters: [
        {
          "j.programId": req.body.programId,
        },
        {
          "i.technologyId": req.body.technologyId,
        },
      ],
    },
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
  // res.json('okkk')
});

router.post("/updateScore", (req, res) => {
  if (req.body.type === "mcq") {
    User.findByIdAndUpdate(
      { _id: req.body.id },
      {
        $set: {
          "programs.$[j].technologies.$[i].sections.$[k].assessment.questions":
            req.body.questions,
          "programs.$[j].technologies.$[i].sections.$[k].assessment.status":
            "Completed",
          "programs.$[j].technologies.$[i].sections.$[k].status": "Completed",
          "programs.$[j].technologies.$[i].sections.$[k].score": req.body.score,
          "programs.$[j].technologies.$[i].sections.$[k].rating":
            req.body.ratings,
        },
      },
      {
        arrayFilters: [
          {
            "j.programId": req.body.programId,
          },
          {
            "i.technologyId": req.body.technologyId,
          },
          {
            "k.sectionId": req.body.sectionId,
          },
        ],
      },
      (err, result) => {
        if (err) {
          res.send(err);
        } else {
          res.send(result);
        }
      }
    );
  } else {
    User.findByIdAndUpdate(
      { _id: req.body.id },
      {
        $set: {
          "programs.$[j].technologies.$[i].sections.$[k].assessment.questions":
            req.body.questions,
          "programs.$[j].technologies.$[i].sections.$[k].assessment.status":
            "Completed",
          "programs.$[j].technologies.$[i].sections.$[k].status":
            "Review Pending",
        },
      },
      {
        arrayFilters: [
          {
            "j.programId": req.body.programId,
          },
          {
            "i.technologyId": req.body.technologyId,
          },
          {
            "k.sectionId": req.body.sectionId,
          },
        ],
      },
      (err, result) => {
        if (err) {
          res.send(err);
        } else {
          res.send(result);
        }
      }
    );
  }
});

module.exports = router;
