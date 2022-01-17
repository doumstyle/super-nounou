const router = require("express").Router();
const Families = require("./../models/families.model");
//? We used mongoose to use the built-in method isValidObjectId
const mongoose = require("mongoose");



router.get("/families", (req, res) => {
	Families.find()
		.then((families) => {
			res.render("families/familiesList.hbs", {
				families: families,
				css: ["families"],
			});
		})
		.catch((e) => console.error(e));
});

router.get("/:id", (req, res) => {
	Families.findById(req.params.id)
		.then((family) => {
			res.render("families/oneFamily.hbs", {
				family: family,
				css: ["families"],
			});
		})
		.catch((e) => console.error(e));
});


module.exports = router;