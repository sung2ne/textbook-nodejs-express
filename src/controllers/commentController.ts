// filename: src/controllers/commentController.ts
import { Request, Response, NextFunction } from 'express';
import { Comment } from '../models/Comment';
import mongoose from 'mongoose';

// 댓글 등록
export const store = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { boardId } = req.params;
    const { content } = req.body;
    const authorId = (req.user as any)._id;

    if (!mongoose.Types.ObjectId.isValid(boardId)) {
      res.status(400).json({ error: '올바르지 않은 게시글 ID입니다.' });
      return;
    }

    const comment = new Comment({
      board: boardId,
      author: authorId,
      content,
    });
    await comment.save();

    res.redirect(`/boards/${boardId}`);
  } catch (error) {
    next(error);
  }
};
