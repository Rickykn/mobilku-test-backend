const { Sequelize } = require("sequelize");
const postgresConfig = require("../configs/database");
const pg = require("pg");

// local connect database
// const sequelize = new Sequelize({
//   username: postgresConfig.DB_USERNAME,
//   password: postgresConfig.DB_PASSWORD,
//   database: postgresConfig.DB_NAME,
//   port: 5432,
//   host: "localhost",
//   dialect: "postgres",
//   logging: false,
// });

const sequelize = new Sequelize(process.env.DB_URL, {
  dialectModule: pg,
  logging: false,
});

const User = require("../models/user")(sequelize);

module.exports = {
  sequelize,
  User,
};
