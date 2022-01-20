const router = require("express").Router();
const Matches = require("../models/matches.model");
const mongoose = require("mongoose");
const protectRoute = require("./../middlewares/protectRoute");

router.use(protectRoute);


router.get("/", (req, res) => {
  res.render("matches/contacts");  
});



router.post('/:likedId', async (req, res, ext) => {

try {
  const likerId = req.session.currentUser._id; 
  const likedId = req.params.likedId;
  const newLike = await  Matches.create({liker: likerId, liked: likedId});
  console.log("newLike avant populate >>", newLike);
  const match  = await Matches.findOne({liked : likerId, liker: likedId});

  console.log("match >>", match);
  console.log("match type >>", typeof match);
  if (match !== null) {
    await Matches.findById(newLike._id)
    //.populate("User");
    console.log("newLike.liker après populate >>", newLike.liker);
    res.render("matches/contacts", {
      liker: newLike.liker,
      liked: newLike.liked
    });
  } else {
    res.redirect('/users');
  }
}
  catch (error) {
    console.error(error);  

	}
});


module.exports = router;
