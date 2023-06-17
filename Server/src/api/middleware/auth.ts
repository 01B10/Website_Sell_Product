import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
const auth = async (req: Request, res: Response) => {
  try {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith("Bearer")) {
      return res.status(400).send({ message: "fail", err: "You don't login" });
    }
    const token = auth.split(" ")[1];
    const decoded: any = jwt.verify(token, "we17317");
    res.status(200).send({ ...decoded, token: token });
  } catch (error) {
    res.status(500).send({ err: error });
  }
};

export default auth;
