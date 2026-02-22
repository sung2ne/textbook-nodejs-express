// filename: src/types/api.ts

// API 응답 제네릭 타입
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// 유틸리티 타입 활용 예시
export type CreateDto<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateDto<T> = Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt'>>;
