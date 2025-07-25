import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Footer from '../components/Footer';

export default function ArticleDetailPage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ name: '', text: '' });

  // Lấy bài viết chi tiết
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/articles/${id}`);
        const data = await res.json();
        setArticle(data);
      } catch (err) {
        console.error('Lỗi tải bài viết:', err);
      }
    };
    fetchArticle();
  }, [id]);

  // Lấy bài viết gợi ý (ngoài bài hiện tại)
  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/articles`);
        const data = await res.json();
        const filtered = data.filter((a) => a.id !== parseInt(id));
        setRelatedArticles(filtered);
      } catch (err) {
        console.error('Lỗi tải bài viết gợi ý:', err);
      }
    };
    fetchRelated();
  }, [id]);

  // Lấy bình luận
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/articles/${id}/comments`);
        const data = await res.json();
        setComments(data.map(c => ({ name: c.name, text: c.content })));
      } catch (err) {
        console.error('Lỗi tải bình luận:', err);
      }
    };
    fetchComments();
  }, [id]);

  const handleLike = () => setLiked(!liked);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.name || !newComment.text) return;

    try {
      const res = await fetch(`http://localhost:5000/api/articles/${id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ content: newComment.text }),
      });

      if (res.ok) {
        const newCmt = { name: newComment.name, text: newComment.text };
        setComments([...comments, newCmt]);
        setNewComment({ name: '', text: '' });
      } else {
        alert('Bạn cần đăng nhập để bình luận.');
      }
    } catch (err) {
      console.error('Lỗi gửi bình luận:', err);
    }
  };

  if (!article) return <div className="min-h-screen flex items-center justify-center text-gray-500">Đang tải bài viết...</div>;

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
