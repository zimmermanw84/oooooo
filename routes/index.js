var express = require('express');
var router = express.Router();

var fs = require('fs');
var multiParty = require('connect-multiparty')();
var S3FS = require('s3fs');
var s3fsObj = new S3FS('saltys3testing', {
  accessKeyId: "",
  secretAccessKey: ""
});

// Use connect multiparty for s3 file stream integration
router.use(multiParty);

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'OOO' });
});

router.get('/dashboard', function(req, res, next) {
  if (!req.user) res.redirect('/');

  res.user = req.user.dataValues;

  res.render('dashboard', {
    username: req.user.dataValues.username,
    email: req.user.dataValues.email,
    googleID: req.user.dataValues.googleID,
    img: req.user.dataValues.img
  });
});

router.get('/media', function(req, res) {
  // TODO: Get Route to show uploaded media
});

router.post('/media_upload', function(req, res) {

});

module.exports = router;