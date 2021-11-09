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

router.get("/albums/:id([a-z0-9]{24})", (req, res) => {
  albumModel
    .findById(req.params.id)
    .populate("artist label")
    .populate({ path: "artist", populate: { path: "style", model: "Styles" } })
    .then((album) => res.status(200).json(album))
    .catch((err) => {
      console.error(err);
    });
});

router.post("/albums/create", uploader.single("cover"), (req, res) => {
  albumModel.create({
    ...req.body,
    releaseDate: req.body.releaseDate || Date.now(),
    cover: req.file ? req.file.secure_url : "https://res.cloudinary.com/gdaconcept/image/upload/v1614649269/workshop-artistify/Drukqs__Front_Cover_ccmndb.png"
  })
  .then((album) => res.status(201).json(album))
  .catch((err) => console.log("something went wrong with the album creation", err))
})

router.patch("/albums/:id([a-z0-9]{24})/edit", uploader.single("cover"), (req, res) => {
  albumModel.findByIdAndUpdate(req.params.id, {
    ...req.body,
    releaseDate: req.body.releaseDate || Date.now(),
    cover: req.file ? req.file.secure_url : "https://res.cloudinary.com/gdaconcept/image/upload/v1614649269/workshop-artistify/Drukqs__Front_Cover_ccmndb.png"
  }, {new: true})
  .then((album) => res.status(201).json(album))
  .catch((err) => console.log("something went wrong with the album editing", err))
})

router.delete("/albums/:id", (req, res) => {
  albumModel
    .findByIdAndDelete(req.params.id)
    .then((album) => res.status(200).json(album))
    .catch((err) => {
      console.error(err);
    });
});


module.exports = router;
