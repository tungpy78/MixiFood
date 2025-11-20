import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
    email: string;
    password?: string; // Ẩn khi gửi về client
    username: string;
    phone?: string;
    address?: string;
    role: 'customer' | 'restaurant_owner' | 'admin';
    createdAt: Date;
    updatedAt: Date;
    comparePassword(enteredPassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>({
    email: {
    type: String,
    required: [true, 'Email là bắt buộc'],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Mật khẩu là bắt buộc'],
    select: false, // Ẩn mật khẩu khi truy vấn
  },
  username: {
    type: String,
    required: [true, 'Tên người dùng là bắt buộc'],
  },
  role: {
    type: String,
    enum: ['customer', 'restaurant_owner', 'admin'],
    default: 'customer',
  },
  phone: { type: String },
  address: { type: String },
}, { 
  timestamps: true 
});
// Hook: Băm mật khẩu trước khi lưu
userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});
// Method: So sánh mật khẩu
userSchema.methods.comparePassword = async function (enteredPassword: string): Promise<boolean> {
  if (!this.password) return false;
  return await bcrypt.compare(enteredPassword, this.password);
};

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);
export default User;