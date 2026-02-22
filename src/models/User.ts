// filename: src/models/User.ts
import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, '이름은 필수입니다'],
    trim: true
  },
  email: {
    type: String,
    required: [true, '이메일은 필수입니다'],
    unique: true,
    lowercase: true,
    trim: true
  }
}, {
  timestamps: true
});

export const User = model<IUser>('User', userSchema);
