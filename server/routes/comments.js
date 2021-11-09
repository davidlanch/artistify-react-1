/*------------------------------------------
// COMMENTS ROUTING
------------------------------------------*/

const express = require("express");
const router = new express.Router();
const commentModel = require("../model/Comment");

router.get("/comments/:type/:id", (req, res, next) => {

  const x = req.params.type.toString()
  commentModel.find({$and : [{category: req.params.type }, {$$x: req.params.id }]} )
  .then((comments) => {
    console.log(comments);
    res.status(200).json({ msg: "@todo" })
  })
  .catch((error) => console.error(error))
  
});

router.post("/comments/:type/:id", async (req, res, next) => {
  // console.log("REQ BODY", req.body)
  // console.log("REQ USER", req.user)
  
  const newObject = req.body
  newObject.author = req.user._id
  // console.log('NEW OBJECT', newObject)
  commentModel.create(newObject)
  .then((ok) => res.status(200).json({ msg: "@todo" }))
  .catch((error) => console.error(error))
  
});

module.exports = router;
