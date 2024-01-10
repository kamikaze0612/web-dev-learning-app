const express = require("express");

const instructionController = require("../controllers/instructionController");
const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.protect);

router
  .route("/")
  .get(instructionController.getAllInstructions)
  .post(
    authController.restrictTo("admin"),
    instructionController.createInstruction
  );

router
  .route("/:id")
  .get(instructionController.getInstruction)
  .patch(
    authController.restrictTo("admin"),
    instructionController.updateInstruction
  )
  .delete(
    authController.restrictTo("admin"),
    instructionController.deleteInstruction
  );

module.exports = router;
