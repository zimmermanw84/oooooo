"use strict";

var Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes) {

    var Menu_item = sequelize.define('menu_item', {

        menu_item_id: {
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
        price: {
            type: Sequelize.STRING,
        },
        item_img: {
            type: Sequelize.STRING,
        },
        rating: {
            type: Sequelize.STRING,
        }
    });

    return Menu_item;
};
