const router = require("express").Router();
const Users = require("./../models/users.model");
const uploader = require("./../config/cloudinary.config");
const protecRoute = require("./../middlewares/protectRoute");

router.use(protecRoute);

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

router.get("/id/delete", async (req, res, next) => {
  const id = req.params.id;
  try {
    await Users.findByIdAndDelete(id);
    res.redirect("/users");
  } catch (error) {
    next(error);
  }
});

router.get("/:id/update", (req, res, next) => {
  const id = req.params.id;

  Users.findById(id)
    .then(user => {
      if (req.session.currentUser.role === "babysitter") {
        res.render("users/updateFamily.hbs", {
          family: user
        });
      } else if (req.session.currentUser.role === "family") {
        res.render("users/updateBabysitter.hbs", {
          babysitter: user
        });
      }
    })
    .catch(next);
});

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
