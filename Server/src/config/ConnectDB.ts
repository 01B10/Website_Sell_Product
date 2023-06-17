import mongoose from "mongoose";

export const ConnectDB = () => {
  mongoose.connect("mongodb://127.0.0.1:27017/Assignment").then(() => {
    console.log("Success");
  });
};
