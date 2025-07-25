import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';

export default function ArticleListPage() {
  const [articles, setArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch('http://localhost:5000/api/articles')
      .then(res => res.json())
      .then(data => setArticles(data))
      .catch(err => console.error("Lỗi khi tải bài viết:", err));
  }, []);

  const filteredArticles = articles.filter((article) => {
    const lowerSearch = searchTerm.toLowerCase();
    const matchesSearch =
      article.title.toLowerCase().includes(lowerSearch) ||
      article.content.toLowerCase().includes(lowerSearch);

    const matchesCategory =
      selectedCategory === "" || article.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <div className="min-h-screen bg-gray-50 text-gray-800 px-4 py-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-teal-700 mb-10">
            Danh sách bài viết
          </h1>

          {/* Bộ lọc tìm kiếm */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <input
              type="text"
              placeholder="Tìm theo tiêu đề hoặc nội dung..."
              className="border border-gray-300 rounded-md px-4 py-2 w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-teal-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="border border-gray-300 rounded-md px-4 py-2 w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-teal-400"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Tất cả chủ đề</option>
              <option value="Sức khỏe tim mạch">Sức khỏe tim mạch</option>
              <option value="Sức khỏe tinh thần">Sức khỏe tinh thần</option>
              <option value="Lối sống">Lối sống</option>
              <option value="Bệnh mãn tính">Bệnh mãn tính</option>
            </select>
          </div>

          {/* Danh sách bài viết */}
          <div className="grid md:grid-cols-3 gap-8">
            {filteredArticles.length === 0 ? (
              <p className="text-center col-span-3 text-gray-500">Không tìm thấy bài viết phù hợp.</p>
            ) : (
              filteredArticles.map((article) => (
                <div
                  key={article.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 flex flex-col"
                >
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="p-4 flex flex-col justify-between flex-1">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">
                        📅 {new Date(article.date).toLocaleDateString()}
                      </p>
                      <h2 className="text-xl font-semibold text-teal-600 mb-2 line-clamp-2 leading-snug min-h-[3rem]">
                        {article.title}
                      </h2>
                      <p className="text-gray-700 text-sm leading-tight mb-2 line-clamp-2">
                        {article.content}
                      </p>
                    </div>
                    <Link
                      to={`/articles/${article.id}`}
                      className="text-teal-600 font-medium hover:underline mt-auto"
                    >
                      Đọc thêm →
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
