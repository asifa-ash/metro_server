import CartModel from "../model/cart.js";

// add to cart...................................................................

export const cart = async (req, res) => {
  const { userId, productId } = req.body;
  console.log(userId, productId, "hhhhhhhh");

  try {
    const cart = await CartModel.findOne({ userId: userId });
    if (!cart) {
      const newCart = await CartModel.insertMany({
        userId: userId,
        items: [{ productId, Qty: 1 }],
      });
      console.log(newCart, "bbbbbbbbb");
      return newCart;
    } else {
      let itemIndex = cart.items.filter((p) => p.productId == productId);
      if (itemIndex.length > 0) {
        await CartModel.updateOne(
          { userId: userId, "items.productId": productId },
          {
            $inc: {
              "items.$.Qty": 1,
            },
          }
        );
      } else {
        await CartModel.updateOne(
          { userId: userId },
          { $push: { items: { productId, Qty: 1 } } }
        );
      }
    }
  } catch (err) {
    console.log(err);
  }
};

// cart count...........................................
export const cartCount = async (req, res) => {
  const { userId, productId } = req.body;
  
  try {
    const pipeline = [
      // Match documents for the specific user_id
      {
        $match: {
          userId: userId,
        },
      },
      // Unwind the product array to deconstruct it into individual documents
      { $unwind: "$items" },
      // Group by null to calculate the total quantity of all products in the cart
      {
        $group: {
          _id: null,
          totalCartQuantity: { $sum: "$items.Qty" },
        },
      },
    ];

    const result = await CartModel.aggregate(pipeline);

    if (result.length > 0) {
      const totalCartQuantity = result[0].totalCartQuantity;
      console.log(
        `Total quantity of all products in the user's cart: ${totalCartQuantity}`
      );
      return result;
    } else {
      console.log("User's cart not found or empty.");
    }
  } catch (error) {
    console.error("Error while calculating total cart quantity:", error);
  }
};

// get cartData........................................................................

export const getCart = () => {
  const carts = CartModel.find();
  const count = carts.length;
  console.log(carts,"kkkkkkk");
  return { carts, count };
};
