// filename: src/services/boardService.ts
import { Board, IBoard } from '../models/Board';
import { CreateBoardDto, UpdateBoardDto } from '../types/board';

interface PaginationResult {
  boards: IBoard[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const boardService = {
  async findAll(page = 1, limit = 10): Promise<PaginationResult> {
    const skip = (page - 1) * limit;

    const [boards, total] = await Promise.all([
      Board.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select('title author views createdAt'),
      Board.countDocuments()
    ]);

    return {
      boards,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  },

  async search(
    keyword: string,
    type: 'title' | 'content' | 'author' = 'title',
    page = 1,
    limit = 10
  ): Promise<PaginationResult> {
    const skip = (page - 1) * limit;
    const query = { [type]: { $regex: keyword, $options: 'i' } };

    const [boards, total] = await Promise.all([
      Board.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select('title author views createdAt'),
      Board.countDocuments(query)
    ]);

    return {
      boards,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) }
    };
  },

  async findById(id: string): Promise<IBoard | null> {
    return Board.findById(id);
  },

  async findByIdAndIncrementViews(id: string): Promise<IBoard | null> {
    return Board.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true }
    );
  },

  async create(data: CreateBoardDto): Promise<IBoard> {
    return Board.create(data);
  },

  async update(id: string, data: UpdateBoardDto): Promise<IBoard | null> {
    return Board.findByIdAndUpdate(id, data, { new: true });
  },

  async delete(id: string): Promise<IBoard | null> {
    return Board.findByIdAndDelete(id);
  }
};
