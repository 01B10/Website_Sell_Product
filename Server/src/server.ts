import express from "express";
import dotenv from "dotenv";
import { ConnectDB } from "./config/ConnectDB";
import router from "./api/router/Device.router";
import routerBrand from "./api/router/Brand.router";
import cors from "cors";
import routerUser from "./api/router/User.router";
import notFound from "./api/middleware/notFound";
import { uploadImage } from "./api/controller/image.controller";
import routerImage from "./api/router/images.router";
import routerCart from "./api/router/Cart";

dotenv.config();
const port = process.env.PORT || 3000;
const app = express();

app.use(express.static("src/public"));

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

ConnectDB();

app.use("/api/products", router);
app.use("/api/brands", routerBrand);
app.use("/api/users", routerUser);
app.use("/api", routerImage);
app.use("/api/cart", routerCart);
app.use(notFound);
app.listen(port, () => {
  console.log("Server is running at: " + port);
});
