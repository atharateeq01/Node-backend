import Order, { IOrder } from '@models/Order';
import { IUser } from '@models/User';
import { deleteCartByUserId } from './cartService';
import { randomStatus } from '@utils/helper/helper';

export const createOrder = async (orderData: Partial<IOrder>, userId: IUser['_id']): Promise<IOrder | null> => {
  const randomNumber = Math.floor(Math.random() * 10000) + 1;
  const order = new Order({
    ...orderData,
    userId,
    orderName: orderData.orderName || `Order-${randomNumber}`,
    orderStatus: randomStatus(),
  });

  await order.save();
  await deleteCartByUserId(userId);
  return getOrderById(order.id);
};

export const getOrderById = async (orderId: string): Promise<IOrder | null> => {
  return await Order.findById(orderId)
    .populate('products.productId')
    .exec();
};

export const updateOrder = async (orderId: string, orderData: Partial<IOrder>): Promise<IOrder | null> => {  
  await Order.findByIdAndUpdate(orderId, orderData, { new: true, runValidators: true }).exec();
  return getOrderById(orderId);
};

export const deleteOrder = async (orderId: string): Promise<void> => {
  await Order.findByIdAndDelete(orderId).exec();
};

export const getOrders = async (): Promise<IOrder[]> => {
  const orders = await Order.find({})
  .populate('products.productId')
  .exec();
  return orders;
};

export const getOrdersByUser = async (userId: IUser['_id'], sortOrder: 'asc' | 'desc' = 'desc'): Promise<IOrder[]> => {
  const orders = await Order.find({ userId })
    .populate('products.productId')
    .sort({ createdAt: sortOrder === 'asc' ? 1 : -1 }) 
    .exec();  
  return orders;
};
