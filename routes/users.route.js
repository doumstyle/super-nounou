const router = require("express").Router();
const Users = require("./../models/users.model");
const mongoose = require("mongoose");



router.get("/users", (req, res,next) => {
	Users.find()
		.then((users) => {
			res.render("users/uersList.hbs", {
				babysitters: babysitters,
				css: ["users"],
			});
		})
		.catch(next);
});

module.exports = router;