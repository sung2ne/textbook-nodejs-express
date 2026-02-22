// filename: examples/basic-types.ts
// 기본 타입
const name: string = '홍길동';
const age: number = 30;
const isActive: boolean = true;
const nothing: null = null;
const notDefined: undefined = undefined;

// 배열
const numbers: number[] = [1, 2, 3, 4, 5];
const names: string[] = ['홍길동', '김철수', '박영희'];
const mixed: (string | number)[] = ['홍길동', 30];

// 튜플
const person: [string, number] = ['홍길동', 30];

// 열거형 (Enum)
enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT'
}

const move = Direction.Up;

// 유니온 타입
type StringOrNumber = string | number;
const value: StringOrNumber = '안녕하세요';

// 타입 단언
const input = document.getElementById('input') as HTMLInputElement;
