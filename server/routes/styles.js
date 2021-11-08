/*------------------------------------------
// STYLES ROUTING
------------------------------------------*/
const express = require("express");
const router = new express.Router();
const styleModel = require("../model/Style");

router.get("/styles", (req, res) => {
  styleModel.find()
  .then(styles => res.status(200).json(styles))
  .catch(err => {
    console.error(err);
  })
});

router.get("/styles/:id", (req, res) => {
  styleModel.findById(req.params.id)
  .then(style => res.status(200).json(style))
  .catch(err => {
    console.error(err);
  })
});

router.delete("/styles/:id", (req, res) => {
  styleModel.findByIdAndDelete(req.params.id)
  .then(style => res.status(200).json(style))
  .catch(err => {
    console.error(err);
  })
});
module.exports = router;
