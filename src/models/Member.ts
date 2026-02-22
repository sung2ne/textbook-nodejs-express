// filename: src/models/Member.ts
import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IMember extends Document {
  userId: string;
  password: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const memberSchema = new Schema<IMember>({
  userId: {
    type: String,
    required: [true, '아이디는 필수입니다'],
    unique: true,
    minlength: [4, '아이디는 4자 이상이어야 합니다'],
    maxlength: [20, '아이디는 20자 이하여야 합니다'],
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, '비밀번호는 필수입니다'],
    minlength: [8, '비밀번호는 8자 이상이어야 합니다']
  },
  name: {
    type: String,
    required: [true, '이름은 필수입니다'],
    minlength: [2, '이름은 2자 이상이어야 합니다'],
    maxlength: [20, '이름은 20자 이하여야 합니다'],
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

// 비밀번호 해시 (저장 전)
memberSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// 비밀번호 비교
memberSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const Member = model<IMember>('Member', memberSchema);
