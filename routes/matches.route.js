const router = require("express").Router();
const Matches = require("../models/matches.model");
const mongoose = require("mongoose");

router.get("/", (req, res) => {
  res.render("matches/contacts");  
});



router.post('/:likedId', (req, res) => {
  //liker :req.session.currentUser._id 
  //liked : req.params.likedId
  Matches.create(req.body)
      .then(match => {
         Matches.findById(match._id)
              //.populate("User")
              //.then(match => res.json({ data: match }))
              .then(match => res.render("matches/contacts", {cellphone: match}))
      })
      .catch(error => console.log(error));
    });





module.exports = router;
