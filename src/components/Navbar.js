import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <img
          src="/web_logo.png"
          alt="Logo"
          className="h-16 w-auto"
        />
      
        <div className="space-x-10 text-xl font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'text-teal-600 border-b-2 border-teal-600 pb-1' : 'text-gray-700 hover:text-teal-600'
            }
          >
            Trang chủ
          </NavLink>
          <NavLink
            to="/articles"
            className={({ isActive }) =>
              isActive ? 'text-teal-600 border-b-2 border-teal-600 pb-1' : 'text-gray-700 hover:text-teal-600'
            }
          >
            Bài viết
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? 'text-teal-600 border-b-2 border-teal-600 pb-1' : 'text-gray-700 hover:text-teal-600'
            }
          >
            Giới thiệu
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? 'text-teal-600 border-b-2 border-teal-600 pb-1' : 'text-gray-700 hover:text-teal-600'
            }
          >
            Đăng nhập
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
