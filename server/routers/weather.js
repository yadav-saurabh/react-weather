const express = require("express");
const Weather = require("../models/weather");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/api/weather", auth, async (req, res) => {
  try {
    const weather = new Weather(req.body);
    const data = await weather.save();
    res.send({ id: data.id, msg: "success" });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/api/weather", auth, async (req, res) => {
  try {
    const data = await Weather.find()
      .sort("-date")
      .skip(parseInt(req.query.skip) || 0)
      .limit(8);
    const total = await Weather.countDocuments();
    res.send({ total, data, limit: 8 });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
