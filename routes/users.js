var express = require('express');
var router = express.Router();

var isLoggedIn = function(req) {
  return req.cookies.username !== undefined
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
  var username = req.params.username;
  var allposts = req.app.locals.posts;
  var posts = allposts.filter(function(e) {
    return e.user === username;
  })
  // don't show a page for an invalid username
  if (req.app.locals.users.indexOf(username) < 0) {
    res.send("<h1>404!!!</h1>");
  }
  res.render('userpage', {user: username, posts: posts});
});

module.exports = router;
