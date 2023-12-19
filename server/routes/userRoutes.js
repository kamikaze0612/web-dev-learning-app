/* Node modules */
const express = require("express");

/* 3rd party modules */
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = express.Router();

/* User authentication */
router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);

/* Updating password */
router.patch(
  "/updateMyPassword",
  authController.protect,
  authController.updatePassword
);

router
  .route("/")
  .get(
    authController.protect,
    authController.restrictTo("admin"),
    userController.getUsers
  )
  .post(userController.createUser);
router.route("/:id").get(userController.getUser);

module.exports = router;
