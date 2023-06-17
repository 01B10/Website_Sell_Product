import express from "express";
import checkUpload from "../middleware/checkUpload";
const { upload, uploadImage } = require("../controller/image.controller");
const routerImage = express.Router();

routerImage.post(
  "/upload-image",
  checkUpload,
  upload.single("image"),
  uploadImage
);

export default routerImage;
