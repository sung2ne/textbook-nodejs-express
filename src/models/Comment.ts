// filename: src/models/Comment.ts
import { Schema, model, Document, Types } from 'mongoose';

export interface IComment extends Document {
  board: Types.ObjectId;
  author: Types.ObjectId;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema = new Schema<IComment>(
  {
    board: {
      type: Schema.Types.ObjectId,
      ref: 'Board',
      required: [true, '게시글은 필수입니다.'],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, '작성자는 필수입니다.'],
    },
    content: {
      type: String,
      required: [true, '내용은 필수입니다.'],
      minlength: [1, '내용은 1자 이상이어야 합니다.'],
      maxlength: [500, '내용은 500자 이하여야 합니다.'],
      trim: true,
    },
  },
  { timestamps: true }
);

commentSchema.index({ board: 1, createdAt: 1 });

export const Comment = model<IComment>('Comment', commentSchema);
