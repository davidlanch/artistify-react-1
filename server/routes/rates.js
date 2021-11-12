/*------------------------------------------
// RATES ROUTING
------------------------------------------*/

const express = require("express");
const router = new express.Router();

const models = {
  album: require("../model/Album"),
  artist: require("../model/Artist")
};


router.get("/rates/:type/:id", (req, res) => {
  models[req.params.type].findById(req.params.id).populate({path: "rates", populate: {path: "author", model: "Users"}})
  .then((rate) => res.status(200).json(rate))
  .catch((err) => console.error(err))
});


router.patch("/rates/:type/:id", (req, res) => {
  models[req.params.type].patch(req.params.id)
  .then((rate) => res.status(200).json(rate))
  .catch((err) => console.error(err))
  //{ path: "artist", populate: { path: "style", model: "Styles" } })
});


router.patch("/rates/:type/:id", (req, res) => {
  IF
  models[req.params.type].findById(req.params.id).populate({path: "rates", populate: {path: "author", model: "Users"}})
  .then((rate) => res.status(200).json(rate))
  .catch((err) => console.error(err))
  //{ path: "artist", populate: { path: "style", model: "Styles" } })
});

module.exports = router;
