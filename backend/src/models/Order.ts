import mongoose, { Document, Model, Schema } from 'mongoose';
import { IUser } from './User';
import { IRestaurant } from './Restaurant';
import { IFoodItem } from './FoodItem';

// Định nghĩa 1 món hàng trong đơn
export interface IOrderItem {
  foodId: IFoodItem['_id'];
  name: string;
  price: number;
  quantity: number;
}

// Định nghĩa các trạng thái của đơn hàng
export type OrderStatus = 'pending' | 'confirmed' | 'shipping' | 'delivered' | 'cancelled';

// Interface (TypeScript)
export interface IOrder extends Document {
  userId: IUser['_id'];
  restaurantId: IRestaurant['_id'];
  items: IOrderItem[];
  totalPrice: number;
  status: OrderStatus;
  shippingAddress: string;
  phone: string;
}

// Schema (Mongoose)
// Schema cho IOrderItem (sẽ được nhúng vào Order)
const orderItemSchema = new Schema<IOrderItem>({
  foodId: { type: Schema.Types.ObjectId, ref: 'FoodItem', required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },
}, { _id: false }); // _id: false vì đây là sub-document

// Schema cho Order
const orderSchema = new Schema<IOrder>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  restaurantId: {
    type: Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true,
  },
  items: [orderItemSchema], // Một mảng các món hàng
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'shipping', 'delivered', 'cancelled'],
    default: 'pending',
  },
  shippingAddress: {
    type: String,
    required: [true, 'Địa chỉ giao hàng là bắt buộc'],
  },
  phone: {
    type: String,
    required: [true, 'Số điện thoại là bắt buộc'],
  }
}, { 
  timestamps: true 
});

const Order: Model<IOrder> = mongoose.model<IOrder>('Order', orderSchema);
export default Order;