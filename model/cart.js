import mongoose from "mongoose";
const cartItemSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  Qty: {
    type: Number,
    required: true,
    default: 1,
  },
  // price: {
  //   type: Number,
  //   required: true,
  // },
});

const CartSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    items: [cartItemSchema],
    total: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);
const CartModel = mongoose.model("Cart", CartSchema);
export default CartModel;
