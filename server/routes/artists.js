/*------------------------------------------
// ARTISTS ROUTING
------------------------------------------*/
const express = require("express");
const router = new express.Router();

const artistModel = require("../model/Artist");
const albumModel = require("../model/Album");

router.get("/artists", (req, res) => {
  artistModel
    .find()
    .populate("style")
    .then((artists) => res.status(200).json(artists))
    .catch((err) => {
      console.error(err);
    });
});

router.get("/artists/:id", (req, res) => {
  artistModel
    .findById(req.params.id)
    .populate("style")
    .then((artist) => res.status(200).json(artist))
    .catch((err) => {
      console.error(err);
    });
});

router.delete("/artists/:id", (req, res) => {
  artistModel
    .findByIdAndDelete(req.params.id)
    .then((artist) => res.status(200).json(artist))
    .catch((err) => {
      console.error(err);
    });
});

module.exports = router;
