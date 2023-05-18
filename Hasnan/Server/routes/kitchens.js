const express = require("express");
const router = express.Router();
const Kitchen = require("../structure/kitchen");

router.get("/", async (req, res) => {
  //fetch all food and send
  try {
    //await for async return
    const kitchen = await Kitchen.find();
    //send in json format.. .send will send in text form
    res.json(kitchen);
    console.log("Get Request Worked");
    return res.send({token});
  } catch (err) {
    res.send("Error: " + err);
  }

});

module.exports = router;
