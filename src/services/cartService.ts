import Cart, { ICart } from '@models/Cart';
import { IUser } from '@models/User';
import mongoose from 'mongoose';

// Create cart with multiple productIds
export const createCart = async (
  userId: IUser['_id'],
  addInCart?: { productId: mongoose.Schema.Types.ObjectId, itemAmount: number },
  productIdToDelete?: mongoose.Schema.Types.ObjectId
): Promise<ICart | null> => {
  // If neither addInCart nor productIdToDelete is provided, return null
  if (!addInCart && !productIdToDelete) {
    return null;
  }

  // Find the user's existing cart
  let existingCart = await Cart.findOne({ userId });

  // If the user has no existing cart and addInCart is provided, create a new cart
  if (!existingCart && addInCart) {
    const newCart = new Cart({
      userId,
      cartItems: [{ productId: addInCart.productId, itemAmount: addInCart.itemAmount }],
    });
    const a = await newCart.save();
    return await getCartById(newCart.id);
  }

  // If the user has an existing cart
  if (existingCart) {
    // If productIdToDelete is provided, remove the product from the cart
    if (productIdToDelete) {
      existingCart.cartItems = existingCart.cartItems.filter(
        (item) => item.productId.toString() !== productIdToDelete.toString()
      );
      await existingCart.save();
      return await getCartById(existingCart.id);
    }

    // If addInCart is provided, update or add the product to the cart
    if (addInCart) {
      const existingItem = existingCart.cartItems.find(
        (item) => item.productId.toString() === addInCart.productId.toString()
      );

      if (existingItem) {
        // Update the itemAmount if the product is already in the cart
        existingItem.itemAmount = addInCart.itemAmount;
      } else {
        // Add the new item to the cart
        existingCart.cartItems.push(addInCart);
      }
      await existingCart.save();
      return await getCartById(existingCart.id);
    }
  }

  // If we reach here, the logic is not expected to handle anything else
  return null;
};

// Fetch all carts with populated productIds
export const getCarts = async (): Promise<ICart[]> => {
  return await Cart.find({}).populate('cartItems.productId').exec();  // Changed to productIds
};

export const getCartForUser = async (userId: IUser['_id']): Promise<ICart[]> => {
  return await Cart.find({ userId }).populate('cartItems.productId').exec();  // Changed to productIds
};

export const getCartById = async (cartId: string): Promise<ICart | null> => {
  return await Cart.findById(cartId).populate('cartItems.productId').exec();  // Changed to productIds
};

export const getCartByProductId = async (productId: string): Promise<ICart[]> => {
  return await Cart.find({ 'cartItems.productId': productId }).populate('cartItems.productId').exec();  // Changed to productIds
};

export const updateCart = async (cartId: string, cartData: Partial<ICart>): Promise<ICart | null> => {
  return await Cart.findByIdAndUpdate(cartId, cartData, { new: true, runValidators: true }).exec();
};

// Delete cart by ID
export const deleteCart = async (cartId: string): Promise<void> => {
  await Cart.findByIdAndDelete(cartId).exec();
};

// Delete cart by user ID
export const deleteCartByUserId = async (userId: IUser['_id']): Promise<void> => {
    await Cart.findOneAndDelete({userId}).exec();
};
