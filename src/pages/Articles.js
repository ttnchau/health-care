import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { useState } from 'react';

const articles = [
  {
    id: 1,
    title: 'Dinh dưỡng cho sức khỏe tim mạch',
    excerpt: 'Khám phá những loại thực phẩm giúp cải thiện sức khỏe tim mạch...',
    image: 'https://suckhoedoisong.qltns.mediacdn.vn/324455921873985536/2024/10/24/co-tim-1729763955568534921178.jpg',
    date: '24/06/2025',
    category: "dinhduong",
  },
  {
    id: 2,
    title: 'Làm sao để ngủ ngon hơn mỗi đêm?',
    excerpt: 'Giấc ngủ ảnh hưởng lớn đến sức khỏe tinh thần và thể chất...',
    image: 'https://www.findjobs.vn//htdocs/images/news/202002/htdocs-images-NGU.jpg',
    date: '22/06/2025',
    category: "giacngu",
  },
  {
    id: 3,
    title: 'Thể dục buổi sáng: lợi ích và cách bắt đầu',
    excerpt: 'Tập luyện nhẹ buổi sáng giúp tăng năng lượng và cải thiện tâm trạng...',
    image: 'https://cafefcdn.com/203337114487263232/2024/3/4/photo2024-03-0319-42-24-1709469850910307318592-1709553067620-1709553068102372735353.jpg',
    date: '20/06/2025',
    category: "theduc",
  },
  {
    id: 4,
    title: 'Cách quản lý căng thẳng hiệu quả',
    excerpt: 'Học cách thở sâu, thiền định và xây dựng lối sống tích cực để giảm stress...',
    image: 'https://cdn.nhathuoclongchau.com.vn/unsafe/800x0/https://cms-prod.s3-sgn09.fptcloud.com/positive_stress_la_gi_cach_quan_ly_cang_thang_hieu_qua_2_f79e39bedd.jpg',
    date: '18/06/2025',
    category: "tamly",
  },
  {
    id: 5,
    title: 'Uống đủ nước có thật sự cần thiết?',
    excerpt: 'Nước đóng vai trò quan trọng trong hầu hết các chức năng cơ thể...',
    image: 'https://s7ap1.scene7.com/is/image/aiastage/uong-nuoc-nhieu-co-tac-dung-gi?qlt=85&wid=1024&ts=1678456208335&dpr=off',
    date: '16/06/2025',
    category: "dinhduong",
  },
  {
    id: 6,
    title: 'Tác hại của thói quen ngồi lâu',
    excerpt: 'Ngồi lâu liên tục có thể gây đau lưng, thoái hóa cột sống và béo phì...',
    image: 'https://cdn.nhathuoclongchau.com.vn/unsafe/800x0/filters:quality(95)/https://cms-prod.s3-sgn09.fptcloud.com/dan_van_phong_da_biet_den_tac_hai_cua_ngoi_qua_lau_o_mot_cho_chua_2_1024x683_5faade8142.jpg',
    date: '14/06/2025',
    category: "benhthuonggap",
  },
];

export default function ArticleListPage() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const filteredArticles = articles.filter((article) => {
    const matchesCategory =
      selectedCategory === "" || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      <div className="min-h-screen bg-gray-50 text-gray-800 px-4 py-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-teal-700 mb-10">
            Danh sách bài viết
          </h1>
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <input
              type="text"
              placeholder="Tìm kiếm bài viết..."
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
              <option value="dinhduong">Dinh dưỡng</option>
              <option value="giacngu">Giấc ngủ</option>
              <option value="theduc">Thể dục</option>
              <option value="tamly">Tâm lý</option>
              <option value="benhthuonggap">Bệnh thường gặp</option>
            </select>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
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
                    <p className="text-sm text-gray-500 mb-1">📅 {article.date}</p>
                    <h2 className="text-xl font-semibold text-teal-600 mb-2 line-clamp-2 leading-snug min-h-[3rem]">
                      {article.title}
                    </h2>
                    <p className="text-gray-700 text-sm leading-tight mb-2 line-clamp-2">
                      {article.excerpt}
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
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
