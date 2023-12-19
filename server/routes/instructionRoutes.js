const express = require("express");

const instructionController = require("../controllers/instructionController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(authController.protect, instructionController.getAllInstructions)
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    instructionController.createInstruction
  );

module.exports = router;
