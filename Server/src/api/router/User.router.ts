import express from "express";
import {
  createUser,
  getAllUser,
  updateUser,
  getUser,
  login,
} from "../controller/User.controller";
import auth from "../middleware/auth";

const routerUser = express.Router();

routerUser.route("/").get(getAllUser).post(createUser);
routerUser.get("/userDetail", auth);
routerUser.route("/:id").put(updateUser).get(getUser);
routerUser.post("/login", login);

export default routerUser;
