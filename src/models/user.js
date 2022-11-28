const { DataTypes } = require("sequelize");

const User = (sequelize) => {
  return sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
    },
    usia: {
      type: DataTypes.INTEGER,
    },
    mobile: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    education: {
      type: DataTypes.STRING,
    },
    image1: {
      type: DataTypes.STRING,
    },
    image2: {
      type: DataTypes.STRING,
    },
  });
};

module.exports = User;
