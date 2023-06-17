import { Request, Response } from "express";
import DeviceData from "../model/Device";
import DeviceValidate from "../validate/DeviceValidate";

const getAllDevices = async (req: Request, res: Response) => {
  try {
    const { brand, q } = req.query;
    const objecQueries: any = {};

    if (brand) {
      objecQueries["brand"] = brand;
    }

    if (q) {
      objecQueries["$or"] = [
        { name: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
        { shortdescription: { $regex: q, $options: "i" } },
      ];
    }
    const data = await DeviceData.find(objecQueries).populate("brand");
    if (!data) {
      return res.status(400).send({ message: "Fail", err: "Loi" });
    }
    return res.status(200).send({ message: "true", data: data });
  } catch (error) {
    return res.status(500).send({ message: "Fail", err: error });
  }
};

const getDevice = async (req: Request, res: Response) => {
  try {
    const data = await DeviceData.findOne({ _id: req.params.id });
    if (!data) {
      return res
        .status(400)
        .send({ message: "Fail", err: "Ko tim thay san pham" });
    }
    return res.status(200).send({ message: "true", data: data });
  } catch (error) {
    return res.status(500).send({ message: "Fail", err: error });
  }
};

const createDevice = async (req: Request, res: Response) => {
  try {
    const { error } = DeviceValidate.validate(req.body, { abortEarly: false });
    if (error) {
      return res
        .status(400)
        .send({ message: "fail", err: error.details.map((err) => err) });
    }
    const data = await DeviceData.create(req.body);
    if (!data) {
      return res.status(400).send({ message: "Fail", err: "Loi" });
    }
    return res.status(200).send({ message: "true", data: data });
  } catch (error) {
    return res.status(500).send({ message: "Fail", err: error });
  }
};

const updateDevice = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = await DeviceData.findByIdAndUpdate(id, req.body, {
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

const deleteDevice = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = await DeviceData.findByIdAndRemove(id, req.body);
    if (!data) {
      return res
        .status(400)
        .send({ message: "Fail", err: "Ko tim thay san phamr" });
    }
    return res.status(200).send({ message: "true", data: data });
  } catch (error) {
    return res.status(500).send({ message: "Fail", err: error });
  }
};

export { getAllDevices, createDevice, updateDevice, getDevice, deleteDevice };
