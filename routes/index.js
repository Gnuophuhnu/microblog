var express = require('express');
var _ = require("lodash");
var router = express.Router();
var fs = require('fs');
var path = require('path');
var moment = require('moment');

var saveData = function(data) {
  console.log("saveData called");
  var jsonFilePath = path.join(__dirname, '..', 'bin/data.json');
  console.log(jsonFilePath);
  //
  var dataObject = {};
  dataObject.users = data.users;
  dataObject.posts = data.posts;
  fs.writeFile(jsonFilePath, JSON.stringify(dataObject), function (err, data) {
    if (err) console.log("ERROR");
    // if (err) throw err;
    console.log("saved data");
  });
}

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
  var date = new Date();
  newPost._timestamp = date;
  newPost.prettytimestamp = moment(date).format("h:mm:ss");
  newPost._id = guid();
  req.app.locals.posts.unshift(newPost);
  saveData(req.app.locals);
  res.end();
})

// POST (from the login form)
router.post('/login', function(req, res, next) {
  var username = req.body.username.toLowerCase();
  // remove leading spaces from the inputted username
  while (username[0] === " ") {
    username = username.slice(1);
  }
  if (username === "") res.redirect("/login")
  if (req.app.locals.users.indexOf(username) < 0) {
    req.app.locals.users.push(username);
    saveData(req.app.locals);
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
