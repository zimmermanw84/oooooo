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

    var Menu = sequelize.define('menu', {

        menu_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        rating: {
            type: Sequelize.STRING,
        }
    });


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

    Menu.hasMany(Menu_item, { foreignKey: 'menu_id'});
    Menu_item.belongsTo(Menu, {foreignKey: 'menu_id'});

    return Menu_item;
};
