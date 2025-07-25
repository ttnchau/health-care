import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Articles from './pages/Articles';
import ArticleDetail from './pages/ArticleDetail';
import AddArticle from './pages/AddArticle';
import BMI from './pages/BMI';
import Login from './pages/Auth';
import About from './pages/About';
import AnalyticsDashboard from './components/AnalyticsDashboard';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:id" element={<ArticleDetail />} />
        <Route path="/add-article" element={<AddArticle />} />
        <Route path="/bmi" element={<BMI />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/analytics" element={<AnalyticsDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
