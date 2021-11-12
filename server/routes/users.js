/*------------------------------------------
// USERS ROUTING
------------------------------------------*/

const express = require("express");
const router = new express.Router();
const userModel = require("../model/User");

router.get("/users/:id", async (req, res, next) => {
  res.send("todo");
});

module.exports = router;
