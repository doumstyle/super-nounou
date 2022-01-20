const router = require("express").Router();
const Users = require("./../models/users.model");
const mongoose = require("mongoose");
const haversine = require("haversine-distance")


router.get("/", (req, res, next) => {

  console.log('# req.session.currentUser', req.session.currentUser)
  // find the list of !role users sorted by geospatial proximity
  const findQuery = { 
    role:{ $ne: req.session.currentUser.role},
    coordinates: {
      $near: {
        $geometry: { type: "Point", coordinates: req.session.currentUser.coordinates } }
      }
    }
 
   Users.find(findQuery)
     .then((users) => {
        const [loggedUserLat, loggedUserLong] = req.session.currentUser.coordinates
        users = users.map(_ => {
          const [lat, long] = _.coordinates

          console.log('@ cal', loggedUserLat, loggedUserLong, lat, long)

          _.distance = haversine({latitude: loggedUserLat, longitude: loggedUserLong}, 
            {latitude: lat,  longitude: long})
          console.log('@ distance', haversine({latitude: loggedUserLat, longitude: loggedUserLong}, 
            {latitude: lat,  longitude: long}))

          return _ 
        })

        res.render("users/usersList", {
          users: users,
          css: ["users", "sign"],
        });
     })
     .catch(next);
 });
 

router.get("/:id", (req, res, next) => {
  console.log(req.params);
  const isValidId = mongoose.isValidObjectId(req.params.id);
  const id = req.params.id;
  if (isValidId) {
    Users.findById(id)
      .then((user) => {
        console.log(user);

        res.render("users/oneUser.hbs", {
          user: user,
          css: ["oneUser"],
        });
      })
      .catch((e) => console.error(e));
  } else {
    next();
  }
});

router.get("/create", (req, res, next) => {
  res.render("users/createUser.hbs", {
    css: ["create"]
  });
});

router.post("/create", (req, res) => {
  console.log(req.body);
	Users.create(req.body)
    .then((newUser) => {
      console.log("NewUser: ", newUser);
      res.redirect("/usersList");
    })
    .catch((e) => console.error(e));
});

router.get("/id/delete", async (req, res) => {
	const id = req.params.id;
	try {
		await Users.findByIdAndDelete(id);
		res.redirect("/users");
	} catch (error) {
		console.error(error);
	}
});

router.get("/:id/update", (req, res) => {
	const id = req.params.id;

	Users.findById(id)
		.then((user) => {
			res.render("users/updateUser.hbs", {
				user: user,
			});
		})
		.catch((e) => console.error(e));
});

router.post("/:id/update", (req, res) => {
	const id = req.params.id;
	Users.findByIdAndUpdate(id, req.body, { new: true })
		.then((updatedUser) => {
			console.log(updatedUser);
			res.redirect("/users/" + id);
		})
		.catch((e) => console.error(e));
});


module.exports = router;
