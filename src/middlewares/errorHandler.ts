// filename: src/middlewares/errorHandler.ts
import { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error('에러:', err.message);
  res.status(500).json({
    error: '서버 에러가 발생했습니다'
  });
};

export default errorHandler;
