/*------------------------------------------
// ARTISTS ROUTING
------------------------------------------*/
const express = require("express");
const router = new express.Router();

const artistModel = require("../model/Artist");
const albumModel = require("../model/Album");
const uploader = require("./../config/cloudinary")

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
  console.log("REQ BODY", req.params.id)
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

router.patch("/artists/:id", (req, res) => {
  artistModel
    .findByIdAndUpdate(req.params.id, req.body)
    .then((artist) => res.status(200).json(artist))
    .catch((err) => {
      console.error(err);
    });
});

router.post("/artists/create", (req, res) => {
  console.log("REQ BODY", req.body)
  artistModel
    .create(req.body)
    .then((artist) => res.status(200).json(artist))
    .catch((err) => {
      console.error(err);
    });
});

module.exports = router;
