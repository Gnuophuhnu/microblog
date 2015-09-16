var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // list all users
  // res.send('show list of all users');
  console.log(req.app.locals);
  console.log(req.app.locals.users);
  var userObjects = req.app.locals.users.map(function(e) {
    return {username: e};
  })
  res.render("users", {users: userObjects});
});

router.get('/:username', function(req, res, next) {
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
