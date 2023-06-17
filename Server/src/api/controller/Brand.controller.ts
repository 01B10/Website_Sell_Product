import { Request, Response } from "express";
import BrandData from "../model/Brand";
import BrandValidate from "../validate/BrandValidate";
const getAllBrand = async (req: Request, res: Response) => {
  try {
    const data = await BrandData.find();
    if (!data) {
      return res.status(400).send({ message: "Fail", err: "Loi" });
    }
    return res.status(200).send({ message: "true", data: data });
  } catch (error) {
    return res.status(500).send({ message: "Fail", err: error });
  }
};

const createBrand = async (req: Request, res: Response) => {
  try {
    const { error } = BrandValidate.validate(req.body, { abortEarly: false });
    if (error) {
      return res
        .status(400)
        .send({ message: "fail", err: error.details.map((err) => err) });
    }
    const data = await BrandData.create(req.body);
    if (!data) {
      return res.status(400).send({ message: "Fail", err: "Loi" });
    }
    return res.status(200).send({ message: "true", data: data });
  } catch (error) {
    return res.status(500).send({ message: "Fail", err: error });
  }
};

const updateBrand = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = await BrandData.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!data) {
      return res.status(400).send({ message: "Fail", err: "Ko the update" });
    }
    return res.status(200).send({ message: "true", data: data });
  } catch (error) {
    return res.status(500).send({ message: "Fail", err: error });
  }
};

export { getAllBrand, createBrand, updateBrand };
