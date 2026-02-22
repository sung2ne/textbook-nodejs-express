// filename: src/index.ts
import 'dotenv/config';
import app from './app';
import { connectDatabase } from './config/database';

const PORT = process.env.PORT || 3000;

connectDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`서버 실행 중: http://localhost:${PORT}`);
  });
});
