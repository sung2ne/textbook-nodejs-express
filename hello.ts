// filename: hello.ts
const message: string = 'Hello TypeScript!';
const count: number = 42;
const isActive: boolean = true;

console.log(message, count, isActive);

// 함수 타입
function greet(name: string): string {
  return `안녕하세요, ${name}님!`;
}

console.log(greet('홍길동'));
