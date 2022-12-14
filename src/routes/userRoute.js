const { userController } = require("../controllers");
const fileUploader = require("../lib/uploader");

const router = require("express").Router();

router.post(
  "/",
  fileUploader({
    prefix: "POST",
    fileType: "image",
  }).single("image"),
  userController.createuser
);

router.get("/:id", userController.getuser);

router.put(
  "/:id",
  fileUploader({
    prefix: "POST",
    fileType: "image",
  }).single("image"),
  userController.updateuser
);

module.exports = router;
