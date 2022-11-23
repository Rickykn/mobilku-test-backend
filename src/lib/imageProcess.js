const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const imageProcessLarge = async (req) => {
  const { filename: image } = req.file;
  const filename = "large_" + image;
  try {
    await sharp(req.file.path)
      .resize({
        width: 1000,
        height: 1000,
        fit: sharp.fit.contain,
        position: sharp.strategy.entropy,
      })
      .toFile(path.resolve(req.file.destination, "resized", filename));

    return filename;
  } catch (err) {
    console.log(err);
  }
};

const imageProcessMedium = async (req) => {
  const { filename: image } = req.file;
  const filename = "medium_" + image;
  try {
    await sharp(req.file.path)
      .resize({
        width: 500,
        height: 500,
        fit: sharp.fit.contain,
        position: sharp.strategy.entropy,
      })
      .toFile(path.resolve(req.file.destination, "resized", filename));
    fs.unlinkSync(__dirname + "/../public/" + req.file.filename);
    return filename;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  imageProcessLarge,
  imageProcessMedium,
};
