var express = require('express');
var router = express.Router();
var models = require('../models');
var fs = require('fs');

var multiParty = require('connect-multiparty'),
    multipartyMiddle = multiParty();
var awsAuth = require("../config/auth").awsAuth;
var S3FS = require('s3fs');
var s3fsObj = new S3FS('saltys3testing/images', {
  accessKeyId: awsAuth.accessKeyId,
  secretAccessKey: awsAuth.secretAccessKey
});

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

// Should break this out to it's own media file
router.get('/media', function(req, res) {
  // TODO: Get Route to show uploaded media
  var images = models.image.findAll({ include: [models.user] })
    .then(function(imgs) {
      res.render('media', { imgs: imgs });
    })
    .error(function(err) {
      console.log(err);
    });
});

router.post('/media_upload', multipartyMiddle, function(req, res) {
  var file = req.files.upload;
  var stream = fs.createReadStream(file.path);
  var userId = req.user.dataValues.id;

  // Make sure only PNG or JPG are uploaded TODO: Add client validation
  switch(file.type) {
    case 'image/png':
    break;
    case 'image/jpg':
    break;
    case 'image/jpeg':
    break;
    default:
    res.send("YOU MAY ON UPLOAD JPG OR PNG FILE TYPES");
    return;
  }

  return s3fsObj.writeFile(file.originalFilename, stream)
    .then(function() {
      models.image.create({
        link: awsAuth.CDNendPoint + file.originalFilename,
        user_id: userId
      })
      .error(function(err) {
        console.log(err);
      });

      fs.unlink(file.path, function(err) {
        if(err) console.log(err);
      });

      res.redirect('/dashboard');
    });

});

module.exports = router;