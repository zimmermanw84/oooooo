"use strict";

var Sequelize = require("sequelize");
// var Menu = require('./menu');

module.exports = function(sequelize, DataTypes) {

  var Restaurant = sequelize.define('restaurant', {

    restaurant_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    phone_number: {
      type: Sequelize.STRING,
    },
    address_1: {
      type: Sequelize.STRING,
    },
    address_2: {
      type: Sequelize.STRING,
    },
    city: {
      type: Sequelize.STRING,
    },
    state: {
      type: Sequelize.STRING,
    },
    zipcode: {
      type: Sequelize.INTEGER,
    },
    restaurant_img: {
      type: Sequelize.STRING,
    },
    rating: {
      type: Sequelize.STRING,
    },
    latitude: {
      type: Sequelize.STRING,
    },
    longitude: {
      type: Sequelize.STRING,
    }

  });

  return Restaurant;
};
