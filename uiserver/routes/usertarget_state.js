var express = require("express");
var router = express.Router();
var { UserTargetState, UserTarget } = require("../models");
const { Op } = require("sequelize");

/* GET user by user_id. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

/* Get target state of week's days to today. */
router.get("/current-week/user-id/:userId/get", async (req, res) => {
  try {
    const userId = req.params.userId;
    const to = new Date();
    const from = new Date(
      to.getFullYear(),
      to.getMonth(),
      to.getDate() - (to.getDay() ? to.getDay() - 1 : 6),
      0,
      0,
      0,
    );
    const TODAY_START = new Date().setHours(0, 0, 0, 0);
    const NOW = new Date();
    const userTargetState = await UserTargetState.findOne({
      where: {
        createdAt: {
          [Op.gt]: TODAY_START,
          [Op.lt]: NOW,
        },
        user_id: userId,
      },
    });

    if (!userTargetState) {
      const userTarget = await UserTarget.findOne({
        where: {
          user_id: userId,
        },
        order: [["createdAt", "ASC"]],
        attributes: ["id"],
      });
      console.log(userTarget);
      await UserTargetState.create({
        user_id: userId,
        usertarget_id: userTarget.id,
        createdAt: to,
        updateAt: to,
      });
    }

    const states = await UserTargetState.findAll({
      where: {
        user_id: userId,
        createdAt: {
          [Op.between]: [from, to],
        },
      },
      include: {
        model: UserTarget,
      },
    });

    let data = [null, null, null, null, null, null, null];
    for (const state of states) {
      data[
        new Date(state.createdAt).getDay() === 0
          ? 6
          : new Date(state.createdAt).getDay() - 1
      ] = state;
    }
    res.json({ success: 1, data });
  } catch (error) {
    res.json({ success: 0, message: error.message });
  }
});

/* POST user's target state. */
router.post("/", async (req, res) => {
  try {
    const TODAY_START = new Date().setHours(0, 0, 0, 0);
    const NOW = new Date();
    const userTargetState = await UserTargetState.findOne({
      where: {
        createdAt: {
          [Op.gt]: TODAY_START,
          [Op.lt]: NOW,
        },
        user_id: req.body.user_id,
      },
    });

    if (userTargetState) {
      userTargetState.update(req.body);
    } else {
      UserTargetState.create(req.body);
    }

    res.json({ success: 1, message: "Trạng thái mục tiêu đã thay đổi!" });
  } catch (error) {
    res.json({ success: 0, message: error.message });
  }
});

module.exports = router;
