// LoginRegister.jsx (React)
import React, { useState } from 'react';

export default function LoginRegister() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ name: '', email: '', password: '' });
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    const { name, email, password } = formData;
    if (!email || !password || (!isLogin && !name)) {
      alert('Vui lòng điền đầy đủ thông tin.');
      return;
    }

    const payload = isLogin ? { email, password } : { name, email, password };
    const endpoint = isLogin
      ? 'http://localhost:5000/api/login'
      : 'http://localhost:5000/api/register';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message || 'Có lỗi xảy ra');
        return;
      }

      if (isLogin) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        alert('Đăng nhập thành công!');
        window.location.href = '/';
      } else {
        alert('Đăng ký thành công! Hãy đăng nhập.');
        toggleMode();
      }
    } catch (err) {
      console.error(err);
      alert('Lỗi kết nối tới server.');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">{isLogin ? 'Đăng nhập' : 'Đăng ký'}</h2>

      {!isLogin && (
        <div className="mb-3">
          <label className="block">Tên</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="border p-2 w-full" />
        </div>
      )}

      <div className="mb-3">
        <label className="block">Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} className="border p-2 w-full" />
      </div>

      <div className="mb-3">
        <label className="block">Mật khẩu</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} className="border p-2 w-full" />
      </div>

      <button onClick={handleSubmit} className="bg-teal-500 text-white px-4 py-2 rounded">
        {isLogin ? 'Đăng nhập' : 'Đăng ký'}
      </button>

      <p className="mt-4 text-sm text-gray-600">
        {isLogin ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}{' '}
        <button className="text-teal-600 underline" onClick={toggleMode}>
          {isLogin ? 'Đăng ký' : 'Đăng nhập'}
        </button>
      </p>
    </div>
  );
}
