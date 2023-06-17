import mongoose from "mongoose";
const { Schema } = mongoose;

const BrandSchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true },
});

export default mongoose.model("Brand", BrandSchema, "Brand");
