import express from "express";
import {
  createBrand,
  getAllBrand,
  updateBrand,
} from "../controller/Brand.controller";

const routerBrand = express.Router();

routerBrand.route("/").get(getAllBrand).post(createBrand);
routerBrand.put("/:id", updateBrand);

export default routerBrand;
