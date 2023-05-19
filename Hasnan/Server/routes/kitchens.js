const express = require("express");
const router = express.Router();
const Kitchen = require("../structure/kitchen");
const Food = require("../structure/detail");

router.get("/", async (req, res) => {
  try {
    const kitchens = await Kitchen.find();
    const kitchenIds = kitchens.map((kitchen) => kitchen._id);

    const foodItems = await Food.find({ kitchenId: { $in: kitchenIds } });

    const kitchenData = kitchens.map((kitchen) => {
      const kitchenFoodItems = foodItems.filter(
        (food) => food.kitchenId.toString() === kitchen._id.toString()
      );

      return {
        _id: kitchen._id,
        fullName: kitchen.fullName,
        expertise: kitchen.expertise,
        address: kitchen.address,
        foodItems: kitchenFoodItems,
      };
    });

    res.json(kitchenData);
    console.log("Get Request Worked");
  } catch (err) {
    res.send("Error: " + err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const kitchenId = req.params.id;
    const kitchen = await Kitchen.findById(kitchenId);

    if (!kitchen) {
      return res.status(404).json({ error: "Kitchen not found" });
    }

    const foodItems = await Food.find({ kitchenId: kitchenId });

    res.json({
      kitchen,
      foodItems,
    });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
