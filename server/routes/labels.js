/*------------------------------------------
// LABELS ROUTING
------------------------------------------*/

const express = require("express");
const router = new express.Router();
const labelModel = require("../model/Label");
const uploader = require("../config/cloudinary");

router.get("/labels", (req, res) => {
  labelModel
    .find()
    .then((labels) => res.status(200).json(labels))
    .catch((err) => {
      console.error(err);
    });
});

router.get("/labels/:id", (req, res) => {
  labelModel
    .findById(req.params.id)
    .then((label) => res.status(200).json(label))
    .catch((err) => {
      console.error(err);
    });
});

router.delete("/labels/:id", (req, res) => {
  labelModel
    .findByIdAndDelete(req.params.id)
    .then((label) => res.status(200).json(label))
    .catch((err) => {
      console.error(err);
    });
});

module.exports = router;