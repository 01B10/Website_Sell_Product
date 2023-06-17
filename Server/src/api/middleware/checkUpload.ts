import { NextFunction, Request, Response } from "express";

const checkUpload = (req: Request, res: Response, next: NextFunction) => {
  if (
    req.body != undefined &&
    JSON.stringify(req.body) != "{}" &&
    req.body != null
  ) {
    return res.send(req.body);
  }
  next();
};

export default checkUpload;
