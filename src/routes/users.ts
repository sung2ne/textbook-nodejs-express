// filename: src/routes/users.ts
import { Router, Request, Response } from 'express';
import { User, CreateUserDto, UpdateUserDto } from '../types/user';

const router = Router();

const users: User[] = [
  { id: 1, name: '홍길동', email: 'hong@example.com' },
  { id: 2, name: '김철수', email: 'kim@example.com' }
];

let nextId = 3;

// GET /users
router.get('/', (req: Request, res: Response<User[]>) => {
  res.json(users);
});

// GET /users/:id
router.get('/:id', (req: Request<{ id: string }>, res: Response<User | { error: string }>) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ error: '사용자를 찾을 수 없습니다' });
  }

  res.json(user);
});

// POST /users
router.post('/', (req: Request<{}, {}, CreateUserDto>, res: Response<User>) => {
  const { name, email } = req.body;

  const newUser: User = {
    id: nextId++,
    name,
    email
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

export default router;
