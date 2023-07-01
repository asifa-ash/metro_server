import mongoose from "mongoose";
const ProductSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    prise: { type: String, required: true },
   
    image: { type: String},
  
  },
  { timestamps: true }
);
const ProductModel = mongoose.model("Products", ProductSchema);
export default ProductModel;
