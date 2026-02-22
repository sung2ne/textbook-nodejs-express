import { Schema, model, Model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser {
  email: string;
  password: string;
  name: string;
  phone: string;
  role: 'user' | 'admin';
  profileImage?: string;
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserMethods {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export type UserDocument = Document<unknown, {}, IUser> & IUser & IUserMethods;

type UserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>({
  email: {
    type: String,
    required: [true, '이메일은 필수입니다.'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, '올바른 이메일 형식이 아닙니다.']
  },
  password: {
    type: String,
    required: [true, '비밀번호는 필수입니다.'],
    minlength: [6, '비밀번호는 6자 이상이어야 합니다.']
  },
  name: {
    type: String,
    required: [true, '이름은 필수입니다.'],
    trim: true,
    minlength: [2, '이름은 2자 이상이어야 합니다.'],
    maxlength: [30, '이름은 30자 이하여야 합니다.']
  },
  phone: {
    type: String,
    required: [true, '전화번호는 필수입니다.'],
    match: [/^010-\d{4}-\d{4}$/, '올바른 전화번호 형식이 아닙니다.']
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  profileImage: {
    type: String,
    default: null
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

userSchema.index({ name: 1, phone: 1 });
userSchema.index({ email: 1, name: 1 });
userSchema.index({ role: 1, isActive: 1 });

// 저장 전 비밀번호 해싱
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
  } catch (err) {
    next(err as Error);
  }
});

// 비밀번호 비교 메서드
userSchema.methods.comparePassword = async function(
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// JSON 변환 시 비밀번호 제외
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

const User = model<IUser, UserModel>('User', userSchema);

export default User;
