const express = require("express");
const router = express.Router();
const userController = require("../Controllers/user");
const validator = require("../Middlewares/validator");
const signupSchema = require("../Schemas/signup");
const updateSchema = require("../Schemas/update");
const auth = require("../Middlewares/auth");
const restrictTo = require("../Middlewares/restrictTo");

router.post("/signup", validator(signupSchema), userController.signup);

router.post("/login", userController.login);

router.get("/", auth, restrictTo("admin"), userController.getAllUsers);

router.get("/:id", auth, restrictTo("admin"), userController.getUserById);

router.patch(
  "/:id",
  auth,
  restrictTo("user"),
  validator(updateSchema),
  userController.updateUser
);

router.delete("/:id", auth, restrictTo("user"), userController.deleteUser);

module.exports = router;
