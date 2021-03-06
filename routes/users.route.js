const router = require("express").Router();
const Users = require("./../models/users.model");
const uploader = require("./../config/cloudinary.config");
const protecRoute = require("./../middlewares/protectRoute");
const mongoose = require("mongoose");
const haversine = require("haversine-distance");

router.use(protectRoute);

router.get("/my-resume", (req, res, next) => {
  res.render("users/myResume")
});
router.get("/my-family", (req, res, next) => {
  res.render("users/myFamily")
});

router.get("/", (req, res, next) => {
  Users.find({ role: { $ne: req.session.currentUser.role } })
    .then(users => {
      if (req.session.currentUser.role === "babysitter") {
        res.render("users/familiesList", {
          families: users,
          css: ["sign", "babysittersList"]
        });
      } else if (req.session.currentUser.role === "family") {
        res.render("users/babysittersList", {
          babysitters: users,
          css: ["sign", "babysittersList"]
        });
      }
      else return res.send("wrong user role !")
    })
    .catch(next);
});


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
 

router.get("/:id([a-f0-9]{24})", (req, res, next) => {
  const id = req.params.id;
  Users.findById(id)
    .then(user => {
      if (req.session.currentUser.role === "babysitter") {
        res.render("users/oneFamily.hbs", {
          family: user,
          css: ["oneFamily"]
        });
      } else if (req.session.currentUser.role === "family") {
        res.render("users/oneBabysitter.hbs", {
          babysitter: user,
          css: ["oneFamily"]
        });
      }
    })
    .catch(next);
});

router.get("/create", (req, res, next) => {  
  if (req.session.currentUser.role === "babysitter") {
  res.render("users/createBabysitter",{
    role : req.session.currentUser.role
  });
  } else if (req.session.currentUser.role = "family") {
    res.render("users/createFamily",{
      role : req.session.currentUser.role
    });
  }
});

router.post("/create", uploader.single("picture"), async (req, res, next) => {
  const newUser = { ...req.body };
  if (!req.file) newUser.picture = undefined;
  else newUser.picture = req.file.path;

  try {
    await Users.create(newUser);
    console.log("NewUser: ", newUser);
    console.log("req.file >>", req.file);
    res.redirect("/users");
  } catch (err) {
    next(err);
  }
});

router.get("/:id/delete", async (req, res, next) => {
  const id = req.params.id;
  try {
    await Users.findByIdAndDelete(id);
    res.redirect("/users");
  } catch (error) {
    next(error);
  }
});

router.get("/:id/update", (req, res, next) => {
  console.log(req.session.currentUser)
        res.render("users/updateUser.hbs");
      }
)


router.post("/:id/update", uploader.single("picture"), (req, res, next) => {
  const id = req.params.id;
  const updatedUser = { ...req.body };
  if (req.file) updatedUser.picture = req.file.path;
  Users.findByIdAndUpdate(id, updatedUser, { new: true })
    .then(updatedUser => {
      console.log(updatedUser);
      res.redirect("/users/" + id);
    })
    .catch(next);
});

module.exports = router;
