"use strict";

var Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes) {

    var Menu_type = sequelize.define('menu_type', {

        menu_type_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
        }
    });

    return Menu_type;
};
