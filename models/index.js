'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.json')[env];
var db        = {};

if ( env === "development" || env === "test" ) {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

if ( env === "production" ) {
  var sequelize = new Sequelize(process.env.DATABASE, process.env.USERNAME, process.env.PASSWORD, config);
}

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename);
  })
  .forEach(function(file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db['user'].hasMany(db['image'], {foreignKey: 'user_id'});
db['image'].belongsTo(db['user'], {foreignKey: 'user_id'});
db['menu'].hasMany(db['menu_item'], { foreignKey: 'menu_id'});
db['menu'].belongsTo(db['restaurant'], {foreignKey: 'restaurant_id'});
db['restaurant'].hasMany(db['menu'], {foreignKey: 'restaurant_id'});
db['menu_type'].hasMany(db['menu'], { foreignKey: 'menu_type_id'});
db['menu_item'].belongsTo(db['menu'], {foreignKey: 'menu_id'});

module.exports = db;