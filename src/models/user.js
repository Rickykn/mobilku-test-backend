const { DataTypes } = require("sequelize");

const User = (sequelize) => {
  return sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dob: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.STRING,
    },
    phone_number: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    education: {
      type: DataTypes.STRING,
    },
  });
};

module.exports = User;
