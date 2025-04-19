const express = require('express');
const router = express.Router();
const controller = require('../controllers/travelController.js');

router.get("/", controller.getAllTravels);
router.post("/", controller.createTravel);
router.get("/:id", controller.getTravel);
router.put("/:id", controller.updateTravel);
router.delete("/:id", controller.deleteTravel);

module.exports = router;