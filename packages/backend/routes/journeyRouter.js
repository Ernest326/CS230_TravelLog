const express = require('express');
const router = express.Router();
const controller = require('../controllers/journeyController.js');

router.get("/", controller.getAllJourneys);
router.post("/", controller.createJourney);
router.get("/:id", controller.getJourney);
router.put("/:id", controller.updateJourney);
router.delete("/:id", controller.deleteJourney);

module.exports = router;