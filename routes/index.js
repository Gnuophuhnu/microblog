var express = require('express');
var _ = require("lodash");
var router = express.Router();

var guid = function() {
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
	}
	return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
		s4() + '-' + s4() + s4() + s4();
}

var isLoggedIn = function(req) {
  return req.cookies.username !== undefined
}

/* GET home page. */
router.get('/', function(req, res, next) {
  // if logged in, cool
  if (isLoggedIn(req)) {
    res.render('index', { title: 'Home Page', currentUser: req.cookies.username});
  } else {
    res.redirect("/login");
  }
});

router.get('/posts', function(req, res, next) {
  res.json(req.app.locals.posts);
})

router.post('/posts', function(req, res, next) {
  console.log(req.body.user);
  console.log(req.body.post);
  var newPost = {user:req.body.user, post:req.body.post};
  newPost._timestamp = new Date();
  newPost._id = guid();
  req.app.locals.posts.unshift(newPost);
  // TODO: save the app.locals.posts to a json file on the server
  res.end();
  // res.json(req.app.locals.posts);
})

// POST (from the login form)
router.post('/login', function(req, res, next) {
  var username = req.body.username;
  // remove leading spaces from the inputted username
  while (username[0] === " ") {
    username = username.slice(1);
  }
  if (username === "") res.redirect("/login")
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
