const { User, PhotoProfile, sequelize } = require("../../lib/sequelize");
const Service = require("../service");
const {
  imageProcessLarge,
  imageProcessMedium,
} = require("../../lib/imageProcess");

class UserService extends Service {
  static createUser = async (req) => {
    try {
      const { name, dob, age, phone_number, city, education } = req.body;

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

      const newUser = await User.create({
        name,
        dob,
        age,
        phone_number,
        city,
        education,
      });

      const userId = newUser.dataValues.id;

      if (!req.file) {
        return this.handleError({
          message: "Foto is required",
          statusCode: 400,
        });
      }

      const result = [];
      const largeImage = await imageProcessLarge(req);
      const mediumImage = await imageProcessMedium(req);

      result.push(largeImage);
      result.push(mediumImage);

      const uploadFileDomain = process.env.UPLOAD_FILE_DOMAIN;

      const newPhotoProfile = await PhotoProfile.create({
        image_url_1: `${uploadFileDomain}/${result[0]}`,
        image_url_2: `${uploadFileDomain}/${result[1]}`,
        user_id: userId,
      });

      newUser.dataValues.Image = newPhotoProfile.dataValues;

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

      const findUser = await User.findByPk(id, {
        include: [
          {
            model: PhotoProfile,
          },
        ],
      });

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
      const { name, dob, age, phone_number, city, education } = req.body;
      const { id } = req.params;

      const findUser = await User.findOne({ where: { id } });

      if (!findUser) {
        return this.handleError({
          message: "User Not Found",
          statusCode: 400,
        });
      }

      await User.update(
        {
          name,
          dob,
          age,
          phone_number,
          city,
          education,
        },
        {
          where: { id },
        }
      );

      if (!req.file) {
        return this.handleError({
          message: "Foto is required",
          statusCode: 400,
        });
      }

      const result = [];
      const largeImage = await imageProcessLarge(req);
      const mediumImage = await imageProcessMedium(req);

      result.push(largeImage);
      result.push(mediumImage);

      const uploadFileDomain = process.env.UPLOAD_FILE_DOMAIN;

      await PhotoProfile.update(
        {
          image_url_1: `${uploadFileDomain}/${result[0]}`,
          image_url_2: `${uploadFileDomain}/${result[1]}`,
        },
        {
          where: { user_id: id },
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
