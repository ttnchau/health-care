// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const contactRoutes = require('./src/routes/contact');
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/api/contact', contactRoutes);

const sql = require('mssql/msnodesqlv8');

const dbConfig = {
  server: 'localhost',
  database: 'HealthCareDB',
  driver: 'msnodesqlv8',
  options: {
    trustedConnection: true
  }
};

sql.connect(dbConfig)
  .then(pool => {
    console.log('Connected to SQL Server via Windows Authentication');
    return pool;
  })
  .catch(err => console.error('DB Connection Failed', err));


sql.connect(dbConfig).then(pool => {
  if (pool.connected) console.log('SQL Server connected');

  // Đăng ký
  app.post('/api/register', async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.request()
      .input('email', sql.VarChar, email)
      .query('SELECT * FROM users WHERE email = @email');
    if (result.recordset.length > 0) return res.status(400).json({ message: "Email already exists" });


    await pool.request()
      .input('name', sql.NVarChar, name)
      .input('email', sql.VarChar, email)
      .input('password', sql.VarChar, hashedPassword)
      .query('INSERT INTO users (name, email, password) VALUES (@name, @email, @password)');
    res.json({ message: "User registered" });
  });

  // Đăng nhập
  app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    const result = await pool.request()
      .input('email', sql.VarChar, email)
      .query('SELECT * FROM users WHERE email = @email');

    const user = result.recordset[0];
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });
    }

    const token = jwt.sign({ id: user.id, name: user.name }, 'your_jwt_secret');
    res.json({
      message: 'Đăng nhập thành công',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  });


  // Middleware xác thực
  function verifyToken(req, res, next) {
    const bearer = req.headers['authorization'];
    if (!bearer) return res.status(403).send('Token required');
    const token = bearer.split(' ')[1];
    try {
      req.user = jwt.verify(token, 'your_jwt_secret');
      next();
    } catch {
      return res.status(403).send('Invalid token');
    }
  }

  // API Articles
  app.get('/api/articles', async (req, res) => {
    const result = await pool.request().query('SELECT * FROM articles ORDER BY created_at DESC');
    res.json(result.recordset);
  });

  app.get('/api/articles/:id', async (req, res) => {
    const id = req.params.id;
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM articles WHERE id = @id');
    res.json(result.recordset[0]);
  });

  app.post('/api/articles', verifyToken, async (req, res) => {
    const { title, content } = req.body;
    const result = await pool.request()
      .input('title', sql.NVarChar, title)
      .input('content', sql.NVarChar, content)
      .input('user_id', sql.Int, req.user.id)
      .query('INSERT INTO articles (title, content, user_id) VALUES (@title, @content, @user_id)');
    res.send('Article created');
  });

  app.put('/api/articles/:id', verifyToken, async (req, res) => {
    const id = req.params.id;
    const { title, content } = req.body;
    await pool.request()
      .input('id', sql.Int, id)
      .input('title', sql.NVarChar, title)
      .input('content', sql.NVarChar, content)
      .query('UPDATE articles SET title = @title, content = @content WHERE id = @id');
    res.send('Article updated');
  });

  app.delete('/api/articles/:id', verifyToken, async (req, res) => {
    const id = req.params.id;
    await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM articles WHERE id = @id');
    res.send('Article deleted');
  });

  // API Comments
  app.get('/api/articles/:id/comments', async (req, res) => {
    const id = req.params.id;
    const result = await pool.request()
      .input('article_id', sql.Int, id)
      .query('SELECT c.*, u.name FROM comments c JOIN users u ON c.user_id = u.id WHERE article_id = @article_id ORDER BY created_at DESC');
    res.json(result.recordset);
  });

  app.post('/api/articles/:id/comments', verifyToken, async (req, res) => {
    const article_id = req.params.id;
    const { content } = req.body;
    await pool.request()
      .input('article_id', sql.Int, article_id)
      .input('content', sql.NVarChar, content)
      .input('user_id', sql.Int, req.user.id)
      .query('INSERT INTO comments (content, article_id, user_id) VALUES (@content, @article_id, @user_id)');
    res.send('Comment added');
  });

  app.listen(5000, () => console.log('Server running on http://localhost:5000'));
}).catch(err => console.error('DB connection error:', err));
