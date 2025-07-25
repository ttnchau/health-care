const jwt = require('jsonwebtoken');
const secretKey = 'your_jwt_secret_key'; // Giống key dùng trong login

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Thiếu token xác thực' });
  }

  const token = authHeader.split(' ')[1]; // "Bearer <token>"

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded; // Lưu thông tin user từ token
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token không hợp lệ hoặc hết hạn' });
  }
}

module.exports = authMiddleware;
