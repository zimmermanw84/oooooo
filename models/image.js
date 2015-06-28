"use strict";

var Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes) {

    var Image = sequelize.define('image', {

        image_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        vote_count: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        link: {
            type: Sequelize.STRING,
        }
    });

    return Image;
};
