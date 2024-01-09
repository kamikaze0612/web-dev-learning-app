/* Node modules */
const express = require("express");

/* 3rd party modules */
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = express.Router();

/* User authentication */
router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);

router.use(authController.protect);

/* Updating password */
router.patch("/updateMyPassword", authController.updatePassword);

router.use(authController.restrictTo("admin"));

router.route("/").get(userController.getUsers).post(userController.createUser);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
