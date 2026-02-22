// filename: src/models/Board.ts
import { Schema, model, Document, Model } from 'mongoose';

export interface IBoard extends Document {
  title: string;
  content: string;
  author: string;
  views: number;
  createdAt: Date;
  updatedAt: Date;
  shortTitle: string;
  incrementViews(): Promise<IBoard>;
}

interface BoardModel extends Model<IBoard> {
  findPopular(limit?: number): Promise<IBoard[]>;
}

const boardSchema = new Schema<IBoard>({
  title: {
    type: String,
    required: [true, '제목은 필수입니다'],
    minlength: [2, '제목은 2자 이상이어야 합니다'],
    maxlength: [100, '제목은 100자 이하여야 합니다'],
    trim: true
  },
  content: {
    type: String,
    required: [true, '내용은 필수입니다'],
    minlength: [10, '내용은 10자 이상이어야 합니다']
  },
  author: {
    type: String,
    required: [true, '작성자는 필수입니다'],
    minlength: [2, '작성자는 2자 이상이어야 합니다'],
    maxlength: [20, '작성자는 20자 이하여야 합니다'],
    trim: true
  },
  views: {
    type: Number,
    default: 0,
    min: 0
  }
}, {
  timestamps: true
});

boardSchema.index({ createdAt: -1 });
boardSchema.index({ views: -1 });

boardSchema.virtual('shortTitle').get(function() {
  return this.title.length > 30
    ? this.title.substring(0, 30) + '...'
    : this.title;
});

boardSchema.methods.incrementViews = async function() {
  this.views += 1;
  return this.save();
};

boardSchema.statics.findPopular = function(limit = 10) {
  return this.find().sort({ views: -1 }).limit(limit);
};

boardSchema.set('toJSON', { virtuals: true });
boardSchema.set('toObject', { virtuals: true });

export const Board = model<IBoard, BoardModel>('Board', boardSchema);
