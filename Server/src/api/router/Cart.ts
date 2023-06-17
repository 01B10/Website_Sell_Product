import express from "express";
import { getUserAndCart } from "../controller/User.controller";

const routerCart = express.Router();

routerCart.route("/:id").get(getUserAndCart);

export default routerCart;
