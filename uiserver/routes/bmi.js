var express = require("express");
var router = express.Router();
const { BMI } = require("../models");

/* GET bmi by user_id. */
router.get("/user-id/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const bmi = await BMI.findOne({
      where: {
        user_id: userId,
      },
    });

    console.log(userId, bmi);
    if (bmi) {
      res.json({ success: 1, data: bmi });
    } else {
      res.json({ success: 0, message: "Chưa điền BMI" });
    }
  } catch (error) {
    res.json({ success: 0, message: error.message });
  }
});

/* POST bmi by user_id. */
router.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    const bmi = await BMI.findOne({
      where: { user_id: data.user_id },
    });
    if (bmi) {
      await bmi.update(data);
    } else BMI.create(data);
    res.json({ success: 1, message: "Cập nhật BMI thành công!" });
  } catch (error) {
    res.json({ success: 0, message: error.message });
  }
});

module.exports = router;
