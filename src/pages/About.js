import { useState } from 'react';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';

const teamMembers = [
  {
    name: 'Nguyễn Văn An',
    role: 'Chuyên gia dinh dưỡng',
    image: 'https://ttu.edu.vn/wp-content/uploads/2025/04/bac-si-da-khoa-hoc-may-nam.png',
    bio: 'Tốt nghiệp Đại học Y Dược TP.HCM, có hơn 10 năm kinh nghiệm trong tư vấn dinh dưỡng cộng đồng.',
  },
  {
    name: 'Trần Thị Bích Uyên',
    role: 'Huấn luyện viên thể hình',
    image: 'https://phunuvietnam.mediacdn.vn/thumb_w/700/179072216278405120/2022/6/30/img16563901438321656554815570-16565576219311186092296-45-0-845-1280-crop-16565576399721399813091.jpg',
    bio: 'Từng làm việc tại các trung tâm thể thao lớn, giúp hàng trăm người thay đổi vóc dáng thành công.',
  },
  {
    name: 'Richard Watson',
    role: 'Bác sĩ chuyên khoa giấc ngủ',
    image: 'https://vinuni.edu.vn/wp-content/uploads/2024/08/theo-nganh-bac-si-tam-ly-hoc-truong-nao-danh-sach-cac-truong-so-1.jpg',
    bio: 'Chuyên nghiên cứu về các rối loạn giấc ngủ và phương pháp cải thiện giấc ngủ tự nhiên.',
  },
];

export default function AboutUsPage() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    content: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { fullName, email, content } = form;

    if (!fullName || !email || !content) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, content })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Lỗi gửi tin nhắn');

      alert('Gửi thành công! Cảm ơn bạn đã liên hệ.');
      setForm({ fullName: '', email: '', content: '' });
    } catch (err) {
      alert(err.message || 'Lỗi kết nối đến server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-teal-100 text-gray-800 px-4 py-16">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-teal-700 mb-6"
          >
            Về Chúng Tôi
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto"
          >
            Chúng tôi là đội ngũ chuyên gia về sức khỏe, giấc ngủ, thể chất và dinh dưỡng. Mục tiêu của chúng tôi là mang lại thông tin chính xác, dễ hiểu và dễ áp dụng để bạn có một cuộc sống khỏe mạnh hơn mỗi ngày.
          </motion.p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transform transition duration-300 hover:-translate-y-1 p-6 text-left"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 object-cover rounded-full mx-auto mb-4 shadow-md"
                />
                <h3 className="text-xl font-semibold text-center text-teal-700">{member.name}</h3>
                <p className="text-sm text-center text-gray-500 mb-2">{member.role}</p>
                <p className="text-sm text-gray-600">{member.bio}</p>
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-20 max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8"
          >
            <h2 className="text-2xl font-bold text-teal-700 mb-4 text-center">Liên hệ với chúng tôi</h2>
            <p className="text-gray-600 text-center mb-6">
              Nếu bạn có câu hỏi hoặc góp ý, hãy gửi cho chúng tôi nhé!
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Họ và tên</label>
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Nhập họ tên của bạn"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="email@domain.com"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Nội dung</label>
                <textarea
                  name="content"
                  value={form.content}
                  onChange={handleChange}
                  rows="4"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Góp ý hoặc liên hệ..."
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-2 rounded-lg transition duration-300"
              >
                {loading ? 'Đang gửi...' : 'Gửi'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
