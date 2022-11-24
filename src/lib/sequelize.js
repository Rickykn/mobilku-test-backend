const { Sequelize } = require("sequelize");
const postgresConfig = require("../configs/database");

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

const sequelize = new Sequelize(process.env.DB_URL);

const User = require("../models/user")(sequelize);
const PhotoProfile = require("../models/photo_profile")(sequelize);

PhotoProfile.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });
User.hasMany(PhotoProfile, { foreignKey: "user_id", onDelete: "CASCADE" });

module.exports = {
  sequelize,
  User,
  PhotoProfile,
};
