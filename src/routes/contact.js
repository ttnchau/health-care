const express = require('express');
const router = express.Router();
const { sql, poolPromise } = require('../db');

router.post('/', async (req, res) => {
  try {
    const pool = await poolPromise;
    const { fullName, email, content } = req.body;

    const request = pool.request();
    request.input('FullName', sql.NVarChar, fullName);
    request.input('Email', sql.NVarChar, email);
    request.input('Content', sql.NVarChar, content);

    await request.query(`
      INSERT INTO ContactMessages (FullName, Email, Content)
      VALUES (@FullName, @Email, @Content)
    `);

    res.status(200).json({ message: 'Đã gửi liên hệ thành công' });
  } catch (err) {
    console.error('SQL error:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
