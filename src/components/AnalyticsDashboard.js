import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  BarChart, Bar, ResponsiveContainer
} from 'recharts';

const viewStats = [
  { date: '07/13', views: 100 },
  { date: '07/14', views: 140 },
  { date: '07/15', views: 180 },
  { date: '07/16', views: 160 },
  { date: '07/17', views: 210 },
  { date: '07/18', views: 260 },
  { date: '07/19', views: 300 },
];

const topArticles = [
  { title: 'Ăn gì tốt cho gan?', views: 180 },
  { title: 'Cách ngủ ngon', views: 150 },
  { title: 'Tập thể dục tại nhà', views: 120 },
  { title: 'Phòng ngừa cảm cúm', views: 90 },
  { title: 'Thực phẩm tăng đề kháng', views: 70 },
];

const AnalyticsDashboard = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">📈 Thống kê lượt xem</h2>

      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <h3 className="text-lg font-medium mb-2">Lượt truy cập theo ngày</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={viewStats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="views" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-xl shadow-md p-4">
        <h3 className="text-lg font-medium mb-2">Bài viết được xem nhiều nhất</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topArticles} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis type="category" dataKey="title" width={150} />
            <Tooltip />
            <Bar dataKey="views" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
