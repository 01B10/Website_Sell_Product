import { NextFunction, Request, Response } from "express";
import UserModel from "../model/UserModel";
const checkAddToCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    // const amount = req.body.amount;
    const device = req.body.deviceId;
    const data = await UserModel.findById(id);
    let boolean = false;
    data?.cart.map(async (item) => {
      if (item == req.body.deviceId) {
        await data?.updateOne({ $set: { cart: {} } });
        boolean = true;
        return;
      }
    });
    // await data?.updateOne({ $set: { cart: device } });
    // if (boolean) {
    //   next();
    // }
    return res.status(200).send({ data: data });
  } catch (error) {}
};

export default checkAddToCart;
