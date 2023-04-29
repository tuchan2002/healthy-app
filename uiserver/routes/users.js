var express = require("express");
var router = express.Router();
var { User } = require("../models");

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

module.exports = router;
