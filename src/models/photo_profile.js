const { DataTypes } = require("sequelize");

const PhotoProfile = (sequelize) => {
  return sequelize.define("Photo_profile", {
    image_url_1: {
      type: DataTypes.STRING,
    },
    image_url_2: {
      type: DataTypes.STRING,
    },
  });
};

module.exports = PhotoProfile;
