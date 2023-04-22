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
    //console.log(req.query.input);
    const videos = await Video.findAll({
      where: req.query.input
        ? {
            title: { [Op.like]: `%${req.query.input}%` },
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
          where: req.query.targets != '[]' && req.query.targets ? { id: JSON.parse(req.query.targets) } : {},
        },
        {
          model: Bodypart,
          as: "bodyparts",
          required: true,
          attributes: ["id", "content"],
          through: {
            attributes: [],
          },
          where: req.query.bodyparts != '[]' && req.query.bodyparts ? { id: JSON.parse(req.query.bodyparts) } : {},
        },
      ],
    });
    console.log(videos.length);
    res.json({ data: videos, success: 1, message: "get all videos" });
  } catch (err) {
    console.log(err);
    res.json({ success: 0, message: "error" });
  }
});

module.exports = router;
