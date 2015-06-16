"use strict";

var Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes) {

    var User = sequelize.define('user', {

        username: {
            type: Sequelize.STRING,
            field: 'username'
        },
        googleToken: {
            type: Sequelize.STRING,
            field: 'googleToken'
        },
        googleID: {
            type: Sequelize.STRING,
            field: 'googleID',
        },
        email: {
            type: Sequelize.STRING,
            field: 'email',
        },
        img: {
            type: Sequelize.STRING,
            field: 'img',
        },
    });

    return User;
};