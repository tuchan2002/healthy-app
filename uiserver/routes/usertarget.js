var express = require("express");
var router = express.Router();
const { UserTarget } = require("../models");
const { Op } = require("sequelize");

/* GET user target by user id. */
router.get("/user-id/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    if (userId) {
      const userTarget = await UserTarget.findOne({
        where: {
          user_id: userId,
        },
        order: [["createdAt", "DESC"]],
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
    const now = new Date();
    const data = {
      user_id: reqBody.user_id,
      getUpAt: reqBody.getUpAt,
      sleepAt: reqBody.sleepAt,
      kcal: reqBody.kcal,
      footsteps_amount: reqBody.footsteps_amount,
      createdAt: now,
      updatedAt: now,
    };

    UserTarget.create(data);
    res.json({ success: 1, message: "Bạn đã có mục tiêu của mình rồi!" });
  } catch (error) {
    res.json({ success: 0, message: error.message });
  }
});

/* PUT user target by user id. */
router.put("/edit", async (req, res) => {
  try {
    console.log("--------------------------------");
    console.log(req?.body);
    const reqBody = req?.body;
    console.log("--------------------------------");

    const TODAY_START = new Date().setHours(0, 0, 0, 0);
    const NOW = new Date();
    const userTarget = await UserTarget.findOne({
      where: {
        user_id: reqBody.user_id,
        createdAt: {
          [Op.gt]: TODAY_START,
          [Op.lt]: NOW,
        },
      },
    });
    console.log(NOW, userTarget);
    if (userTarget) {
      userTarget.update(reqBody);
    } else {
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
    }

    res.json({ success: 1, message: "Mục tiêu đã thay đổi!" });
  } catch (error) {
    res.json({ success: 0, message: error.message });
  }
});

module.exports = router;
