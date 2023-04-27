var express = require("express");
var router = express.Router();
const { UserTarget } = require("../models");

/* GET user target by user id. */
router.get("/user-id/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    if (userId) {
      const userTarget = await UserTarget.findOne({
        where: {
          user_id: userId,
        },
      });

      res.json({ success: 1, data: userTarget });
    }
  } catch (error) {
    res.json({ success: 0, message: error.message });
  }
});

/* POST user target by user id. */
router.post("/", async (req, res) => {
  try {
    const reqBody = req.body;
    const data = {
      user_id: reqBody.user_id,
      getUpAt: reqBody.getUpAt,
      sleepAt: reqBody.sleepAt,
      kcal: reqBody.kcal,
      footsteps_amount: reqBody.footsteps_amount,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    UserTarget.create(data);
    res.json({ success: 1, message: "Bạn đã có mục tiêu của mình rồi!" });
  } catch (error) {
    res.json({ success: 0, message: error.message });
  }
});

module.exports = router;
