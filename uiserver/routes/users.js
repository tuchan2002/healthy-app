var express = require("express");
var router = express.Router();
var { User, SyncedStep } = require("../models");

/* GET user by user_id. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/login", async (req, res) => {
  try {
    const reqBody = req.body;
    let checkUser = await User.findOne({
      where: {
        uid: reqBody.uid,
      },
    });
    let isTheFirst = false;
    if (!checkUser) {
      checkUser = await User.create({
        ...reqBody,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      isTheFirst = true;
    }
    res.json({ success: 1, data: checkUser, isTheFirst });
  } catch (error) {
    res.json({ success: 0, message: error.message });
  }
});

router.post("/sync", async (req, res) => {
  try {
    req.body.steps.map((element) => (element["user_id"] = req.body.id));
    console.log(User);
    const result = await SyncedStep.bulkCreate(req.body.steps, {
      updateOnDuplicate: ["value", "date"],
    });
    if (result) {
      res.json({ success: 1, message: "data synced" });
    } else {
      res.json({ success: 0, error: "not able to bulkCreate" });
    }
  } catch (err) {
    res.json({ success: 0, error: err.message });
  }
});

router.get("/synced_data/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const user = await User.findByPk(req.params.id, {include: ["syncedSteps"]});
    if(user) {
      res.json({ success: 1, data:user, message: "get synced data" });
    } else {
      res.json({ success: 0, error: "not able to get data" });
    }
  } catch (err) {
    res.json({ success: 0, error: err.message });
  }
})

module.exports = router;
