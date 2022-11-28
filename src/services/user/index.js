const { User, PhotoProfile, sequelize } = require("../../lib/sequelize");
const Service = require("../service");
const {
  imageProcessLarge,
  imageProcessMedium,
} = require("../../lib/imageProcess");
const moment = require("moment");

class UserService extends Service {
  static createUser = async (req) => {
    try {
      const { name, date, usia, mobile, city, education } = req.body;

      if (!req.file) {
        return this.handleError({
          message: "Foto is required",
          statusCode: 400,
        });
      }

      const isNameTaken = await User.findOne({
        where: {
          name,
        },
      });

      if (isNameTaken) {
        return this.handleError({
          message: "Username and Email has been taken",
          statusCode: 400,
        });
      }

      const result = [];
      const largeImage = await imageProcessLarge(req);
      const mediumImage = await imageProcessMedium(req);

      result.push(largeImage);
      result.push(mediumImage);

      const uploadFileDomain = process.env.UPLOAD_FILE_DOMAIN;

      const newUser = await User.create({
        name,
        date,
        usia,
        mobile,
        city,
        education,
        image1: `${uploadFileDomain}/${result[0]}`,
        image2: `${uploadFileDomain}/${result[1]}`,
      });

      return this.handleSuccess({
        message: "Created New User",
        statusCode: 201,
        data: newUser,
      });
    } catch (err) {
      console.log(err);

      return this.handleError({
        message: "Server Error",
        statusCode: 500,
      });
    }
  };

  static getUser = async (req) => {
    try {
      const { id } = req.params;

      const findUser = await User.findByPk(id);

      if (!findUser) {
        return this.handleError({
          message: "User Not Found",
          statusCode: 400,
        });
      }

      return this.handleSuccess({
        message: "Get User Success",
        statusCode: 200,
        data: findUser,
      });
    } catch (err) {
      return this.handleError({
        message: "Server Error",
        statusCode: 500,
      });
    }
  };

  static updateUser = async (req) => {
    try {
      const { name, date, usia, mobile, city, education } = req.body;
      const { id } = req.params;

      const findUser = await User.findOne({ where: { id } });

      if (!findUser) {
        return this.handleError({
          message: "User Not Found",
          statusCode: 400,
        });
      }
      const result = [];
      const uploadFileDomain = process.env.UPLOAD_FILE_DOMAIN;
      if (req.file) {
        const largeImage = await imageProcessLarge(req);
        const mediumImage = await imageProcessMedium(req);

        result.push(largeImage);
        result.push(mediumImage);
      }

      await User.update(
        {
          name,
          date,
          usia,
          mobile,
          city,
          education,
          image1: `${uploadFileDomain}/${result[0]}`,
          image1: `${uploadFileDomain}/${result[1]}`,
        },
        {
          where: { id },
        }
      );

      return this.handleSuccess({
        message: "Updated Success",
        statusCode: 200,
      });
    } catch (err) {
      return this.handleError({
        message: "Server Error",
        statusCode: 500,
      });
    }
  };
}

module.exports = UserService;
