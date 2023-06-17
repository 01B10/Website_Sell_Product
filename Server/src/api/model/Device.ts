import mongoose from "mongoose";
const { Schema } = mongoose;

const images = new Schema({
  base_url: { type: String, required: true },
  is_gallery: { type: Boolean, default: true },
  label: { type: String, default: null },
  large_url: { type: String },
  medium_url: { type: String },
  position: { type: String, default: null },
  small_url: { type: String },
  thumbnail_url: { type: String },
});

const attributes = new Schema({
  code: { type: String, required: true },
  name: { type: String, required: true },
  value: { type: String, required: true },
});

const specifications = new Schema({
  name: { type: String, required: true },
  attributes: { type: [attributes], required: true },
});

const ProductsSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  original_price: { type: Number, required: true },
  description: { type: String, required: true },
  shortdescription: { type: String, required: true },
  images: { type: [images], required: true },
  brand: { type: Schema.Types.ObjectId, ref: "Brand" },
  specifications: { type: [specifications], required: true },
});

// ProductsSchema.index({
//   name: "text",
// });

export default mongoose.model("Device", ProductsSchema, "Device");
