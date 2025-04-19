const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController.js');

router.post("/login", controller.loginUser);
router.post("/register", controller.registerUser);
router.get("/:id", controller.getUser);
router.put("/:id", controller.updateUser);
router.delete("/:id", controller.deleteUser);

module.exports = router;