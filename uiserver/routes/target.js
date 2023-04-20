var express = require("express");
var router = express.Router();
const { QueryTypes, Op, where } = require("sequelize");
const {
  Bodypart,
} = require("../models");

router.get('/', async (req, res) => {
    try {
        const bodyparts = await Bodypart.findAll();
        res.json({
            data: bodyparts,
            message: "all bodyparts",
            success: 1,
        })
    } catch(err) {
        console.log(err);
    res.json({ success: 0, message: "error" });
    }
})

module.exports = router