// filename: src/config/database.ts
import mongoose from 'mongoose';

export const connectDatabase = async (): Promise<void> => {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/myapp';

  try {
    await mongoose.connect(uri);
    console.log('MongoDB 연결 성공:', uri);
  } catch (error) {
    console.error('MongoDB 연결 실패:', error);
    process.exit(1);
  }
};

// 이벤트 리스너
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB 연결이 끊어졌습니다.');
});

mongoose.connection.on('error', (error) => {
  console.error('MongoDB 에러:', error);
});
