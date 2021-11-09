/*------------------------------------------
// ALBUMS ROUTING
------------------------------------------*/

const express = require("express");
const router = new express.Router();
const albumModel = require("../model/Album");
const artistModel = require("../model/Artist");
const uploader = require("./../config/cloudinary");

router.get("/albums", (req, res) => {
  albumModel
    .find()
    .populate("artist label")
    .populate({ path: "artist", populate: { path: "style", model: "Styles" } })
    .then((albums) => res.status(200).json(albums))
    .catch((err) => {
      console.error(err);
    });
});

router.get("/albums/:id", (req, res) => {
  albumModel
    .findById(req.params.id)
    .populate("artist label")
    .populate({ path: "artist", populate: { path: "style", model: "Styles" } })
    .then((album) => res.status(200).json(album))
    .catch((err) => {
      console.error(err);
    });
});

router.delete("/albums/:id", (req, res) => {
  albumModel
    .findByIdAndDelete(req.params.id)
    .then((album) => res.status(200).json(album))
    .catch((err) => {
      console.error(err);
    });
});


module.exports = router;
