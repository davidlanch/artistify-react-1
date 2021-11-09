/*------------------------------------------
// LABELS ROUTING
------------------------------------------*/

const express = require("express");
const router = new express.Router();
const labelModel = require("../model/Label");
const uploader = require("../config/cloudinary");


router.post("/labels", (req, res) => {
  console.log("req body", req.body)
  labelModel.create(req.body)
    .then((label) => {
      res.status(201).json(label)  
    }) .catch((err) => {
      res.status(500).json(err)
    })
})


router.patch("/labels/:id/edit", (req, res) => {
  console.log("req body", req.body)
  labelModel.findByIdAndUpdate(req.params.id , req.body )
    .then((label) => {
      res.status(201).json(label)  
    }) .catch((err) => {
      res.status(500).json(err)
    })
})

router.get("/labels", (req, res) => {
  labelModel
    .find()
    .then((labels) => res.status(200).json(labels))
    .catch((err) => {
      console.error(err);
    });
});

router.get("/labels/:id([a-z0-9]{24})", (req, res) => {
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