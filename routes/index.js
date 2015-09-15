var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  // if logged in, cool
  // else redirect to /login
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next) {
  var username = req.body.username;
  res.cookie('username', username);
  // req.cookies.currentUser = req.body.username;
  // cookieParser.parse("username=" + req.body.username);

  // save a cookie with the key `username` and value req.body.username

  // if logged in, cool
  // else redirect to /login
  res.render('index', { title: 'Express', currentUser: username });
});

router.get('/login', function(req, res, next) {
  // if logged in, redirect to "/"
  // else show the login template
  res.render('login')
})



module.exports = router;
