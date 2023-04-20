var express = require("express");
var router = express.Router();
const { QueryTypes, Op, where } = require("sequelize");
const {
  Target,
} = require("../models");

router.get('/', async (req, res) => {
    try {
        const targets = await Target.findAll();
        res.json({
            data: targets,
            message: "all targets",
            success: 1,
        })
    } catch(err) {
        console.log(err);
    res.json({ success: 0, message: "error" });
    }
})

module.exports = router;