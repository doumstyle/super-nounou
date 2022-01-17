const router = require("express").Router();
const Babysitters = require("./../models/babysitters.model");
const mongoose = require("mongoose");



router.get("/babysitters", (req, res,next) => {
	Babysitters.find()
		.then((babysitters) => {
			res.render("baysitters/babysitterList.hbs", {
				babysitters: babysitters,
				css: ["babysitters"],
			});
		})
		.catch(next);
});

module.exports = router;