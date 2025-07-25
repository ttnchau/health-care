import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (storedUser) setCurrentUser(storedUser);
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = () => {
    const { name, email, password } = formData;

    if (!email || !password || (!isLogin && !name)) {
      alert('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    if (isLogin) {
      const stored = JSON.parse(localStorage.getItem(email));
      if (!stored || stored.password !== password) {
        alert('Sai thông tin đăng nhập');
        return;
      }
      localStorage.setItem('currentUser', JSON.stringify(stored));
      setCurrentUser(stored);
      navigate('/');
    } else {
      if (localStorage.getItem(email)) {
        alert('Email đã tồn tại');
        return;
      }

      const user = { name, email, password };
      localStorage.setItem(email, JSON.stringify(user));
      alert('Đăng ký thành công. Bây giờ hãy đăng nhập.');
      setIsLogin(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
  };

  return (
    <div>
      <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded-xl shadow-md">
        {currentUser ? (
          <>
            <h3 className="text-2xl font-semibold mb-4 text-center">Xin chào, {currentUser.name}!</h3>
            <button
              onClick={handleLogout}
              className="w-full py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Đăng xuất
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4 text-center">{isLogin ? 'Đăng nhập' : 'Đăng ký'}</h2>
            {!isLogin && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Họ tên</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            )}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <button
              onClick={handleSubmit}
              className="w-full py-2 px-4 bg-teal-500 text-white rounded hover:bg-teal-600 transition"
            >
              {isLogin ? 'Đăng nhập' : 'Đăng ký'}
            </button>
            <p className="text-center mt-4 text-sm">
              <span
                onClick={toggleMode}
                className="text-teal-600 hover:underline cursor-pointer"
              >
                {isLogin ? 'Chưa có tài khoản? Đăng ký' : 'Đã có tài khoản? Đăng nhập'}
              </span>
            </p>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Auth;
