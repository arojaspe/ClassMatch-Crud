import {Sequelize} from "sequelize";

const db= new Sequelize("lab0_crud", "admin", "00000000", {
    host: "db-lab0.ct6wcoa8uyye.us-east-2.rds.amazonaws.com",
    dialect: "mysql",
});
export default db;