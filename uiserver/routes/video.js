var express = require("express");
var router = express.Router();
const { QueryTypes, Op, where } = require("sequelize");
const {
  Video,
  Bodypart,
  Target,
} = require("../models");

router.get("/info/:id", async (req, res) => {
  try {
    const video = await Video.findByPk(req.params.id, {
      include: ["targets", "bodyparts"],
    });
    res.json({ data: video, success: 1, message: "get video info" });
  } catch (err) {
    console.log(err);
    res.json({ success: 0, message: "error" });
  }
});

router.get("/all", async (req, res) => {
  try {
    console.log(req.body.targets);
    const videos = await Video.findAll({
      where: req.query.input
        ? {
            title: { [Op.like]: `%${input}%` },
          }
        : {},
      include: [
        {
          model: Target,
          as: "targets",
          required: true,
          attributes: ["id", "content"],
          through: {
            attributes: [],
          },
          where: req.body.targets ? { id: req.body.targets } : {},
        },
        {
          model: Bodypart,
          as: "bodyparts",
          required: true,
          attributes: ["id", "content"],
          through: {
            attributes: [],
          },
          where: req.body.bodyparts ? { id: req.body.bodyparts } : {},
        },
      ],
    });
    res.json({ data: videos, success: 1, message: "get all videos" });
  } catch (err) {
    console.log(err);
    res.json({ success: 0, message: "error" });
  }
});

module.exports = router;
