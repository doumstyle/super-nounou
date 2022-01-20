var express = require('express');
var router = express.Router();
const bcrypt = require("bcrypt"); 
const userModel = require("../models/users.model");

router.get('/signin', function(req, res, next) {
  res.render('auth/signin', {
    css: ['sign']
  });
});


router.post('/signin', async (req, res, next) => {
  try {      
      // create contants for model, password and email
      const { email, password } = req.body;
    
      //check if e-mail sent matches the e-mail in the collections
      const foundUser = await userModel.findOne({ email: email });

      if (!foundUser) {
        req.flash("error", "Invalid credentials");
        res.redirect("/auth/signin");
    }
    else {
        const isSamePassword = bcrypt.compareSync(password, foundUser.password);
        if (!isSamePassword && password !== foundUser.password) {
            req.flash("error", "Invalid credentials");
            res.redirect("/auth/signin");
        }
        else {
            const userObject = foundUser.toObject();
            delete userObject.password;
            req.session.currentUser = userObject;
            req.flash("success", "Successfully logged in...");
            res.redirect("/users");
        }
    }
    }
    catch (err) {
        next(err);
    }

    });


router.get('/signup', function(req, res, next) {
  res.render('auth/signup', {
    css: ['sign']
  });
});


router.post('/signup', async (req, res, next) => {  
  try {
    const newUser = { ...req.body };
    
      const foundUser = await userModel.findOne({ email: newUser.email });

      if (foundUser) {
          //req.flash("success", `Welcome back ! ${foundUser.firstName}`);
          res.redirect("/auth/signin");
      }
      else {
          const hashedPassword = bcrypt.hashSync(newUser.password, 10);
          newUser.password = hashedPassword;
          await userModel.create(newUser);
          //req.flash("success", "Welcome, please sign in ");
          res.redirect("/auth/signin");
      }  
    }
    catch (err) {
      let errorMessage = "";
      console.log(err);
      for (field in err.errors) {
          errorMessage += err.errors[field].message + "\n";
      }
      //req.flash("error", errorMessage);
      res.redirect("/auth/signup");
  }
  // next(err)
  // }
})

router.get("/signout", (req, res, next) => {
  req.session.destroy((err) => res.redirect("/auth/signin")
  )
})



module.exports = router;
