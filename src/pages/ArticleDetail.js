import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import Footer from '../components/Footer';

const articles = [
  {
    id: 1,
    title: 'Dinh dưỡng cho sức khỏe tim mạch',
    content: 'Dinh dưỡng đóng vai trò cực kỳ quan trọng trong việc duy trì sức khỏe tim mạch...',
    image: 'https://suckhoedoisong.qltns.mediacdn.vn/324455921873985536/2024/10/24/co-tim-1729763955568534921178.jpg',
    date: '24/06/2025',
  },
  {
    id: 2,
    title: 'Làm sao để ngủ ngon hơn mỗi đêm?',
    content: 'Giấc ngủ là yếu tố then chốt cho sức khỏe tinh thần và thể chất...',
    image: 'https://www.findjobs.vn//htdocs/images/news/202002/htdocs-images-NGU.jpg',
    date: '22/06/2025',
  },
  {
    id: 3,
    title: 'Thể dục buổi sáng: lợi ích và cách bắt đầu',
    content: 'Bắt đầu ngày mới với những bài tập nhẹ như đi bộ, yoga hay chạy bộ...',
    image: 'https://cafefcdn.com/203337114487263232/2024/3/4/photo2024-03-0319-42-24-1709469850910307318592-1709553067620-1709553068102372735353.jpg',
    date: '20/06/2025',
  },
  {
    id: 4,
    title: 'Cách quản lý căng thẳng hiệu quả',
    content: 'Học cách thở sâu, thiền định và xây dựng lối sống tích cực để giảm stress...',
    image: 'https://cdn.nhathuoclongchau.com.vn/unsafe/800x0/https://cms-prod.s3-sgn09.fptcloud.com/positive_stress_la_gi_cach_quan_ly_cang_thang_hieu_qua_2_f79e39bedd.jpg',
    date: '18/06/2025',
  },
  {
    id: 5,
    title: 'Uống đủ nước có thật sự cần thiết?',
    content: 'Nước đóng vai trò quan trọng trong hầu hết các chức năng cơ thể...',
    image: 'https://s7ap1.scene7.com/is/image/aiastage/uong-nuoc-nhieu-co-tac-dung-gi?qlt=85&wid=1024&ts=1678456208335&dpr=off',
    date: '16/06/2025',
  },
  {
    id: 6,
    title: 'Tác hại của thói quen ngồi lâu',
    content: 'Ngồi lâu liên tục có thể gây đau lưng, thoái hóa cột sống và béo phì...',
    image: 'https://cdn.nhathuoclongchau.com.vn/unsafe/800x0/filters:quality(95)/https://cms-prod.s3-sgn09.fptcloud.com/dan_van_phong_da_biet_den_tac_hai_cua_ngoi_qua_lau_o_mot_cho_chua_2_1024x683_5faade8142.jpg',
    date: '14/06/2025',
  },
];

export default function ArticleDetailPage() {
  const { id } = useParams();
  const article = articles.find((a) => a.id === parseInt(id));
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([
    { name: 'Lan', text: 'Hãy để lại bình luận chia sẻ suy nghĩ của bạn về bài viết này. Bạn có thể đặt câu hỏi, góp ý hoặc chia sẻ trải nghiệm của mình. Chúng tôi rất mong nhận được ý kiến từ bạn!' },
  ]);
  const [newComment, setNewComment] = useState({ name: '', text: '' });

  if (!article) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500">Không tìm thấy bài viết.</div>;
  }

  const relatedArticles = articles.filter((a) => a.id !== article.id);

  const handleLike = () => setLiked(!liked);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.name && newComment.text) {
      setComments([...comments, newComment]);
      setNewComment({ name: '', text: '' });
    }
  };

  return (
    <div className="bg-gradient-to-br from-teal-50 via-white to-teal-100">
      <div className="min-h-screen px-4 py-10 text-gray-800">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          <img src={article.image} alt={article.title} className="w-full h-64 object-cover" />
          <div className="p-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-gray-500">📅 {article.date}</p>
              <button onClick={handleLike} className="text-xl text-teal-600">
                {liked ? '❤️ Đã lưu' : '🤍 Lưu bài viết'}
              </button>
            </div>
            <h1 className="text-3xl font-bold text-teal-700 mb-4">{article.title}</h1>
            <p className="text-lg leading-relaxed mb-8">{article.content}</p>

            {/* Bình luận */}
            <div className="border-t pt-6">
              <h2 className="text-2xl font-semibold mb-4">💬 Bình luận</h2>
              <form onSubmit={handleCommentSubmit} className="mb-6 space-y-2">
                <input
                  type="text"
                  placeholder="Tên của bạn"
                  value={newComment.name}
                  onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                  className="w-full px-4 py-2 border rounded"
                  required
                />
                <textarea
                  placeholder="Viết bình luận..."
                  value={newComment.text}
                  onChange={(e) => setNewComment({ ...newComment, text: e.target.value })}
                  className="w-full px-4 py-2 border rounded"
                  required
                />
                <button
                  type="submit"
                  className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
                >
                  Gửi bình luận
                </button>
              </form>

              <div className="space-y-4">
                {comments.map((c, i) => (
                  <div key={i} className="bg-gray-100 p-3 rounded">
                    <p className="font-semibold text-teal-700">{c.name}</p>
                    <p>{c.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bài viết gợi ý */}
            <div className="mt-12 border-t pt-6">
              <h2 className="text-2xl font-semibold mb-4">📰 Bài viết gợi ý</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relatedArticles.map((a) => (
                  <Link
                    to={`/articles/${a.id}`}
                    key={a.id}
                    className="flex items-center bg-gray-100 rounded hover:bg-gray-200 transition p-3"
                  >
                    <img src={a.image} alt={a.title} className="w-20 h-20 object-cover rounded mr-4" />
                    <div>
                      <p className="text-teal-700 font-semibold">{a.title}</p>
                      <p className="text-sm text-gray-500">{a.date}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-10">
              <Link to="/articles" className="inline-block text-teal-700 hover:underline">
                ← Quay lại danh sách bài viết
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
