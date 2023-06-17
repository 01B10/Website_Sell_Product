import mongoose from "mongoose";
const { Schema } = mongoose;
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 1 },
  cart: [
    {
      _id: { type: Schema.Types.ObjectId, ref: "Device" },
      amount: { type: Number, default: 0 },
    },
  ],
});

// 1 client
// 0 admin

export default mongoose.model("User", userSchema, "User");
