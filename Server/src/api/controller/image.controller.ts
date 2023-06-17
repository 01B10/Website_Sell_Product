import multer from "multer";
import sharp from "sharp";
import path from "path";
import { pathDir, getRandomFileName } from "../../ultilities";
import { Request, Response } from "express";
const upload = multer({
  limits: {
    fileSize: 4 * 1024 * 1024,
  },
});

async function uploadImage(req: Request, res: Response) {
  try {
    const imageName = getRandomFileName() + ".png";
    const imagePath = path.join(pathDir, `/public/${imageName}`);
    await sharp(req.file?.buffer).toFile(imagePath);
    return res.send({ data: `http://localhost:8080/${imageName}` });
  } catch (error) {
    res.status(500).send({ err: error });
  }
}
export { upload, uploadImage };
