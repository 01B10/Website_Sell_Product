import { Request, Response } from "express";

const notFound = (req: Request, res: Response) => {
  res.status(404).send({ message: "Not found page" });
};

export default notFound;
