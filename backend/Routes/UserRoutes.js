const express = require("express");
const router = express.Router();
//Insert Model
const User = require("../Model/UserModel.js");
//Insert controller
const UserController = require("../Controllers/UserController.js");

router.get("/", UserController.getAllUsers);
router.post("/", UserController.addUsers);
router.get("/:id", UserController.getById);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);
//export
module.exports = router;
