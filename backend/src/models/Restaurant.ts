import mongoose, { Document, Model, Schema } from 'mongoose';
import { IUser } from './User'; // Import Interface User để tham chiếu

// Interface (TypeScript)
export interface IRestaurant extends Document {
  name: string;
  address: string;
  imageUrl?: string;
  phone?: string;
  ownerId: IUser['_id']; // Liên kết tới User (Chủ quán)
}

// Schema (Mongoose)
const restaurantSchema = new Schema<IRestaurant>({
  name: {
    type: String,
    required: [true, 'Tên quán là bắt buộc'],
    trim: true,
  },
  address: {
    type: String,
    required: [true, 'Địa chỉ là bắt buộc'],
    trim: true,
  },
  imageUrl: { type: String },
  phone: { type: String },
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Quan trọng: Tham chiếu tới Model 'User'
    required: true,
  },
}, { 
  timestamps: true 
});

const Restaurant: Model<IRestaurant> = mongoose.model<IRestaurant>('Restaurant', restaurantSchema);
export default Restaurant;