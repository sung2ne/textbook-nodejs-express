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

// 댓글 목록 조회
export const index = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { boardId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(boardId)) {
      res.status(400).json({ error: '올바르지 않은 게시글 ID입니다.' });
      return;
    }

    const comments = await Comment.find({ board: boardId })
      .populate('author', 'name email')
      .sort({ createdAt: 1 });

    res.json({ comments });
  } catch (error) {
    next(error);
  }
};

// 댓글 수정
export const update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const userId = (req.user as any)._id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ error: '올바르지 않은 댓글 ID입니다.' });
      return;
    }

    const comment = await Comment.findById(id);
    if (!comment) {
      res.status(404).json({ error: '댓글을 찾을 수 없습니다.' });
      return;
    }

    if (comment.author.toString() !== userId.toString()) {
      res.status(403).json({ error: '수정 권한이 없습니다.' });
      return;
    }

    comment.content = content;
    await comment.save();

    res.json({ success: true, comment });
  } catch (error) {
    next(error);
  }
};
