import express from "express";
import {
  createDevice,
  deleteDevice,
  getAllDevices,
  getDevice,
  updateDevice,
} from "../controller/Device.controller";
const router = express.Router();

router.route("/").get(getAllDevices).post(createDevice);
router.route("/:id").put(updateDevice).get(getDevice).delete(deleteDevice);

export default router;
