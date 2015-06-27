var express = require('express');
var router = express.Router();

var fs = require('fs');
var multiParty = require('connect-multiparty'),
    multipartyMiddle = multiParty();

var awsAuth = require("../config/auth").awsAuth;

var S3FS = require('s3fs');
var s3fsObj = new S3FS('saltys3testing', {
  accessKeyId: awsAuth.accessKeyId,
  secretAccessKey: awsAuth.secretAccessKey
});

// Use connect multiparty for s3 file stream integration
// router.use(multipartyMiddle);

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

router.post('/media_upload', multipartyMiddle,function(req, res) {
  // console.log("REQUEST BODY", req.files);
  s3fsObj.writeFile(req.body['upload'], 'FUCK YOU!').then(function() {

    res.redirect('/dashboard');
  });
});

module.exports = router;