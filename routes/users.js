// filename: routes/users.js
const express = require('express');
const router = express.Router();

// 사용자 목록
router.get('/', (req, res) => {
  res.json({ users: ['Alice', 'Bob', 'Charlie'] });
});

// 사용자 상세
router.get('/:id', (req, res) => {
  res.json({ id: req.params.id, name: 'Alice' });
});

// 사용자 생성
router.post('/', (req, res) => {
  res.json({ message: '사용자 생성', data: req.body });
});

// 사용자 수정
router.put('/:id', (req, res) => {
  res.json({ message: `사용자 ${req.params.id} 수정`, data: req.body });
});

// 사용자 삭제
router.delete('/:id', (req, res) => {
  res.json({ message: `사용자 ${req.params.id} 삭제` });
});

module.exports = router;
