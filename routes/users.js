var express = require('express');
var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var router = express.Router();

var isLoggedIn = function(req) {
  return req.cookies.username !== undefined
}

var saveData = function(data) {
  console.log("saveData called");
  console.log(__dirname);
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

/* GET users listing. */
router.get('/', function(req, res, next) {
  if (!isLoggedIn(req)) {
    res.redirect('/login')
  }
  var userObjects = req.app.locals.users.map(function(e) {
    return {username: e};
  })
  res.render("users", {users: userObjects});
});

router.get('/:username', function(req, res, next) {
  if (!isLoggedIn(req)) {
    res.redirect('/login')
  }
  var usercookie = req.cookies.username;
  var username = req.params.username;
  var allposts = req.app.locals.posts;
  var posts = allposts.filter(function(e) {
    return e.user === username;
  })
  // don't show a page for an invalid username
  if (req.app.locals.users.indexOf(username) < 0) {
    res.send("<h1>404!!!</h1>");
  }
  res.render('userpage', {username: username, posts: posts, usercookie: usercookie});
});

router.delete('/delete/:post', function(req, res, next) {
  var postID = req.params.post;
  console.log("try to delete: " + postID);
  _.remove(req.app.locals.posts, function(n) {
    return n._id === postID;
  });
  saveData(req.app.locals);
  res.end();
})

module.exports = router;
