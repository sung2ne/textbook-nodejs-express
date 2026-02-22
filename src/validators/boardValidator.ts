// filename: src/validators/boardValidator.ts
import { body } from 'express-validator';

export const createBoardValidator = [
  body('title')
    .trim()
    .notEmpty().withMessage('제목을 입력해주세요.')
    .isLength({ min: 2 }).withMessage('제목은 2자 이상이어야 합니다.')
    .isLength({ max: 100 }).withMessage('제목은 100자 이하여야 합니다.'),

  body('content')
    .trim()
    .notEmpty().withMessage('내용을 입력해주세요.')
    .isLength({ min: 10 }).withMessage('내용은 10자 이상이어야 합니다.'),

  body('author')
    .trim()
    .notEmpty().withMessage('작성자를 입력해주세요.')
    .isLength({ min: 2 }).withMessage('작성자는 2자 이상이어야 합니다.')
    .isLength({ max: 20 }).withMessage('작성자는 20자 이하여야 합니다.'),

  body('password')
    .notEmpty().withMessage('비밀번호를 입력해주세요.')
    .isLength({ min: 4 }).withMessage('비밀번호는 4자 이상이어야 합니다.')
];

export const updateBoardValidator = [
  body('title')
    .trim()
    .notEmpty().withMessage('제목을 입력해주세요.')
    .isLength({ min: 2 }).withMessage('제목은 2자 이상이어야 합니다.')
    .isLength({ max: 100 }).withMessage('제목은 100자 이하여야 합니다.'),

  body('content')
    .trim()
    .notEmpty().withMessage('내용을 입력해주세요.')
    .isLength({ min: 10 }).withMessage('내용은 10자 이상이어야 합니다.')
];
