var express = require('express');
var router = express.Router();

router.get('/signin', function(req, res, next) {
  res.render('auth/signin');
});





router.get('/signup', function(req, res, next) {
  res.render('auth/signup');
});


module.exports = router;
