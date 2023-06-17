import { NextFunction, Request, Response } from "express";
import UserDate from "../model/UserModel";
import UserValidate from "../validate/UserValidate";
import bcrypt from "bcrypt";
import UserModel from "../model/UserModel";
import jwt from "jsonwebtoken";

const salt = bcrypt.genSaltSync(10);

const getAllUser = async (req: Request, res: Response) => {
  try {
    const data = await UserDate.find().populate({
      path: "cart._id",
    });
    if (!data) {
      return res.status(400).send({ message: "Fail", err: "Loi" });
    }
    return res.status(200).send({ message: "true", data: data });
  } catch (error) {
    return res.status(500).send({ message: "Fail", err: error });
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const data = await UserDate.findOne({ _id: req.params.id });
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

const getUserAndCart = async (req: Request, res: Response) => {
  try {
    const data = await UserDate.findOne({ _id: req.params.id }).populate({
      path: "cart._id",
    });
    if (!data) {
      return res.status(400).send({ message: "Fail", err: "Loi" });
    }
    return res.status(200).send({ message: "true", data: data });
  } catch (error) {
    return res.status(500).send({ message: "Fail", err: error });
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    const { error } = UserValidate.validate(req.body, { abortEarly: false });
    if (error) {
      return res
        .status(400)
        .send({ message: "fail", err: error.details.map((err) => err) });
    }
    const existUser = await UserDate.findOne({ email: req.body.email });
    if (existUser) {
      return res.status(400).send({ message: "fail", err: "Email exist" });
    }
    const password = bcrypt.hashSync(req.body.password, salt);
    const data = await UserDate.create({ ...req.body, password });
    if (!data) {
      return res.status(400).send({ message: "Fail", err: "Loi" });
    }
    return res.status(200).send({ message: "true", data: data });
  } catch (error) {
    return res.status(500).send({ message: "Fail", err: error });
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "fail", err: "email or password must be provided" });
    }

    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .send({ message: "fail", err: "email or password is not correct" });
    }
    const isLogin = bcrypt.compareSync(password, user.password);
    if (!isLogin) {
      return res
        .status(400)
        .send({ message: "Fail", err: "email or password is not correct" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: email,
        phone: user.phone,
        name: user.name,
        role: user.role,
      },
      "we17317",
      {
        expiresIn: "2d",
      }
    );

    return res
      .status(200)
      .send({ message: "true", data: { name: user.name, token: token } });
  } catch (error) {
    return res.status(500).send({ message: "Fail", err: error });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = await UserDate.findByIdAndUpdate(id, req.body, {
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

export { getAllUser, createUser, updateUser, getUser, login, getUserAndCart };
