// filename: examples/interfaces.ts

// 인터페이스
interface User {
  id: number;
  name: string;
  email: string;
  age?: number;         // 선택적 속성
  readonly createdAt: Date;  // 읽기 전용
}

// 함수 타입 인터페이스
interface Formatter {
  (value: string): string;
}

const upperCase: Formatter = (value) => value.toUpperCase();

// 인터페이스 확장
interface AdminUser extends User {
  role: 'admin' | 'superadmin';
  permissions: string[];
}

// 타입 별칭
type Point = {
  x: number;
  y: number;
};

// 교차 타입
type AdminProfile = User & {
  department: string;
};
