"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize("lab0_crud", "admin", "00000000", {
    host: "db-lab0.ct6wcoa8uyye.us-east-2.rds.amazonaws.com",
    dialect: "mysql",
});
exports.default = db;
