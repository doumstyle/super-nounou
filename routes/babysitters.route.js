const router = require("express").Router();
const Babysitters = require("./../models/babysitters.model");
const mongoose = require("mongoose");



router.get("/babysitters", (req, res,next) => {
	Babysitters.find()
		.then((babysitters) => {
			res.render("babysitters/babysittersList.hbs", {
				babysitters: babysitters,
				css: ["babysitters"],
			});
		})
		.catch(next);
});

module.exports = router;