"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Para conectarnos a nuestra base de datos utilizamos Sequalisze un framwork.
const sequelize_1 = require("sequelize");
//Metodo para conectarse-->
// Option 3: Passing parameters separately (other dialects)
const sequelize = new sequelize_1.Sequelize('lp', 'root', 'pucca123', {
    host: 'localhost',
    dialect: 'mysql'
});
exports.default = sequelize;
