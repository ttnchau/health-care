import { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const articlesData = [
  { title: 'Dinh dưỡng cho sức khỏe tim mạch', category: 'Dinh dưỡng', content: 'Khám phá những loại thực phẩm giúp cải thiện sức khỏe tim mạch...' },
  { title: 'Làm sao để ngủ ngon hơn mỗi đêm?', category: 'Giấc ngủ', content: 'Giấc ngủ ảnh hưởng lớn đến sức khỏe tinh thần và thể chất...' },
  { title: 'Thể dục buổi sáng: lợi ích và cách bắt đầu', category: 'Thể dục', content: 'Tập luyện nhẹ buổi sáng giúp tăng năng lượng và cải thiện tâm trạng...' },
  { title: 'Cách quản lý căng thẳng hiệu quả', category: 'Tâm lý', content: 'Học cách thở sâu, thiền định và xây dựng lối sống tích cực để giảm stress...' },
  { title: 'Uống đủ nước có thật sự cần thiết?', category: 'Nước đóng vai trò quan trọng trong hầu hết các chức năng cơ thể...' },
  { title: 'Tác hại của thói quen ngồi lâu', category: 'Bệnh thường gặp', content: 'Ngồi lâu liên tục có thể gây đau lưng, thoái hóa cột sống và béo phì...' },
];

export default function HomePage() {
  const [filter, setFilter] = useState('Tất cả');

  const filteredArticles = filter === 'Tất cả'
    ? articlesData
    : articlesData.filter(article => article.category === filter);

  return (
    <div>
      <div className="min-h-screen bg-white text-gray-800">
        {/* Hero Section */}
        <section className="bg-teal-600 text-white py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Chào mừng đến với HealthCare App
            </h1>
            <p className="text-lg md:text-xl mb-6">
              Nơi chia sẻ kiến thức và lời khuyên chăm sóc sức khỏe đáng tin cậy.
            </p>
            <Link to="/articles">
              <button className="px-6 py-3 bg-white text-teal-600 font-semibold rounded hover:bg-gray-100 transition">
                Khám phá bài viết
              </button>
            </Link>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-teal-700">
              Những tính năng nổi bật
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition">
                <h3 className="text-xl font-semibold text-teal-600 mb-2">Bài viết sức khỏe</h3>
                <p>Cập nhật kiến thức mới nhất về y tế, dinh dưỡng, tâm lý và lối sống lành mạnh.</p>
              </div>
              <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition">
                <h3 className="text-xl font-semibold text-teal-600 mb-2">Dễ sử dụng</h3>
                <p>Giao diện thân thiện với người dùng, dễ dàng tìm kiếm và đọc nội dung.</p>
              </div>
              <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition">
                <h3 className="text-xl font-semibold text-teal-600 mb-2">Luôn cập nhật</h3>
                <p>Nội dung được kiểm duyệt và cập nhật thường xuyên bởi đội ngũ chuyên gia.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Danh mục tin tức */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold text-center text-teal-600 mb-10">Danh mục Tin Tức</h2>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {['Tất cả', 'Dinh dưỡng', 'Giấc ngủ', 'Tập luyện', 'Tâm lý', 'Bệnh thường gặp'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-full border transition duration-200 shadow-sm ${
                    filter === cat
                      ? 'bg-teal-600 text-white'
                      : 'bg-white text-gray-800 border-teal-300 hover:bg-teal-600 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {filteredArticles.map((article, index) => (
                <div
                  key={index}
                  className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition duration-300"
                >
                  <h3 className="text-xl font-semibold text-teal-600 mb-2">{article.title}</h3>
                  <p className="text-sm text-gray-700">{article.content}</p>
                </div>
              ))}
              {filteredArticles.length === 0 && (
                <p className="text-center col-span-full text-gray-500 italic">Không có bài viết nào.</p>
              )}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
