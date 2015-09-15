var express = require('express');
var _ = require("lodash");
var router = express.Router();

var isLoggedIn = function(req) {
  return req.cookies.username !== undefined
}

/* GET home page. */
router.get('/', function(req, res, next) {

  // if logged in, cool
  console.log(req.cookies);
  if (isLoggedIn(req)) {
    res.render('index', { title: 'Home Page', posts: req.app.locals.posts });
  } else {
    res.redirect("/login");
  }

});

// POST (from the login form)
router.post('/login', function(req, res, next) {
  var username = req.body.username;
  if (req.app.locals.users.indexOf(username) < 0) {
    req.app.locals.users.push(username)
  }
  res.cookie('username', username);
  res.redirect("/");
});

router.get('/login', function(req, res, next) {
  if (isLoggedIn(req)) {
    res.redirect('/');
  } else {
    res.render('login')
  }
})



module.exports = router;
