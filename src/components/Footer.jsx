import { FaFacebookF, FaInstagram, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-teal-700 text-white py-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="text-center md:text-left">
          <h3 className="text-xl font-semibold">Trường Đại học Cần Thơ</h3>
          <p className="text-sm">Khu II, Đường 3/2, Ninh Kiều, TP. Cần Thơ</p>
          <p className="text-sm">Email: info@ctu.edu.vn | Điện thoại: (0292) 3832 663</p>
        </div>
        <div className="flex items-center space-x-4">
          <a href="#" className="hover:text-gray-200 transition text-lg">
            <FaFacebookF />
          </a>
          <a href="#" className="hover:text-gray-200 transition text-lg">
            <FaInstagram />
          </a>
          <a href="#" className="hover:text-gray-200 transition text-lg">
            <FaEnvelope />
          </a>
        </div>
      </div>
      <p className="text-center text-sm mt-6 text-gray-300">© 2025 Can Tho University. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
