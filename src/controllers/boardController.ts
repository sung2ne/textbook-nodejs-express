// filename: src/controllers/boardController.ts
import { Request, Response, NextFunction } from 'express';
import { boardService } from '../services/boardService';
import mongoose from 'mongoose';

// 목록 조회
export const list = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = Number(req.query.page) || 1;
    const keyword = req.query.keyword as string;
    const type = (req.query.type as 'title' | 'content' | 'author') || 'title';

    let result;
    if (keyword) {
      result = await boardService.search(keyword, type, page);
    } else {
      result = await boardService.findAll(page);
    }

    res.render('board/list', {
      title: '게시글 목록',
      boards: result.boards,
      pagination: result.pagination,
      keyword,
      type
    });
  } catch (error) {
    next(error);
  }
};

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.render('board/create', { title: '게시글 작성' });
  } catch (error) {
    next(error);
  }
};

export const show = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).render('error/404', { title: '404' });
    }

    const board = await boardService.findByIdAndIncrementViews(id);
    if (!board) {
      return res.status(404).render('error/404', { title: '404' });
    }

    res.render('board/view', { title: board.title, board });
  } catch (error) {
    next(error);
  }
};

// 등록 처리
export const store = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, content, author } = req.body;
    await boardService.create({ title, content, author });
    res.redirect('/boards');
  } catch (error) {
    next(error);
  }
};
