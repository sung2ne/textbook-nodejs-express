// filename: src/types/board.ts
export interface CreateBoardDto {
  title: string;
  content: string;
  author: string;
}

export interface UpdateBoardDto {
  title: string;
  content: string;
}

export interface BoardListItem {
  _id: string;
  title: string;
  author: string;
  views: number;
  createdAt: Date;
}
