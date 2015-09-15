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
  // if `username` is valid, show that user's posts,
  // otherwise show an error page
  // show `username's` posts
  res.send('this is the page for: ' + username);
});

module.exports = router;
