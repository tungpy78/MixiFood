import mongoose, { Document, Model, Schema } from 'mongoose';
import { IRestaurant } from './Restaurant'; // Import Interface Restaurant

// Interface (TypeScript)
export interface IFoodItem extends Document {
  name: string;
  price: number;
  description?: string;
  imageUrl?: string;
  restaurantId: IRestaurant['_id']; // Liên kết tới Restaurant
}

// Schema (Mongoose)
const foodItemSchema = new Schema<IFoodItem>({
  name: {
    type: String,
    required: [true, 'Tên món ăn là bắt buộc'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Giá tiền là bắt buộc'],
    min: [0, 'Giá tiền không thể âm'],
  },
  description: { type: String, trim: true },
  imageUrl: { type: String },
  restaurantId: {
    type: Schema.Types.ObjectId,
    ref: 'Restaurant', // Tham chiếu tới Model 'Restaurant'
    required: true,
  },
}, { 
  timestamps: true 
});

const FoodItem: Model<IFoodItem> = mongoose.model<IFoodItem>('FoodItem', foodItemSchema);
export default FoodItem;