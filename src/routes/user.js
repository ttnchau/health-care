// routes/user.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { sql, poolPromise } = require('../db');

// Đăng ký người dùng
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('name', sql.NVarChar, name)
      .input('email', sql.NVarChar, email)
      .input('password', sql.NVarChar, password)
      .query('INSERT INTO Users (Name, Email, Password) VALUES (@name, @email, @password)');
    
    res.json({ success: true, message: 'Đăng ký thành công!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Lỗi máy chủ' });
  }
});

router.get('/profile', authMiddleware, async (req, res) => {
  const userId = req.user.id;
  try {
    const profile = await sql.query`SELECT * FROM user_profiles WHERE user_id = ${userId}`;
    const bmi = await sql.query`SELECT TOP 10 * FROM bmi_history WHERE user_id = ${userId} ORDER BY created_at DESC`;
    const metrics = await sql.query`SELECT TOP 10 * FROM health_metrics WHERE user_id = ${userId} ORDER BY created_at DESC`;

    res.json({ profile: profile.recordset[0], bmi: bmi.recordset, metrics: metrics.recordset });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server khi lấy thông tin cá nhân.' });
  }
});

// POST: Lưu bài viết
router.post('/bookmark/:articleId', authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const articleId = parseInt(req.params.articleId);
  try {
    await sql.query`INSERT INTO bookmarks (user_id, article_id) VALUES (${userId}, ${articleId})`;
    res.json({ message: 'Đã lưu bài viết.' });
  } catch (err) {
    res.status(500).json({ message: 'Không thể lưu bài viết.' });
  }
});

// DELETE: Bỏ lưu bài viết
router.delete('/bookmark/:articleId', authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const articleId = parseInt(req.params.articleId);
  try {
    await sql.query`DELETE FROM bookmarks WHERE user_id = ${userId} AND article_id = ${articleId}`;
    res.json({ message: 'Đã xoá khỏi danh sách lưu.' });
  } catch (err) {
    res.status(500).json({ message: 'Không thể xoá.' });
  }
});

router.get('/bookmarks', authMiddleware, async (req, res) => {
  const userId = req.user.id;
  try {
    const result = await sql.query`
      SELECT a.*
      FROM bookmarks b
      JOIN articles a ON b.article_id = a.id
      WHERE b.user_id = ${userId}
      ORDER BY b.saved_at DESC`;
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ message: 'Không thể lấy danh sách lưu.' });
  }
});

module.exports = router;
