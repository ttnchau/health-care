create database HealthCareDB;
use HealthCareDB;
-- Bảng Users
CREATE TABLE users (
  id INT PRIMARY KEY IDENTITY,
  name NVARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255)
);

-- Bảng Articles
CREATE TABLE articles (
  id INT PRIMARY KEY IDENTITY,
  title NVARCHAR(255),
  content NVARCHAR(MAX),
  image NVARCHAR(500),
  date DATE DEFAULT GETDATE(),
  category NVARCHAR(100),
  user_id INT FOREIGN KEY REFERENCES users(id),
  created_at DATETIME DEFAULT GETDATE()
);

-- Bảng Comments
CREATE TABLE comments (
  id INT PRIMARY KEY IDENTITY,
  content NVARCHAR(MAX),
  article_id INT FOREIGN KEY REFERENCES articles(id),
  user_id INT FOREIGN KEY REFERENCES users(id),
  created_at DATETIME DEFAULT GETDATE()
);

CREATE TABLE ContactMessages (
  MessageID INT IDENTITY(1,1) PRIMARY KEY,
  FullName NVARCHAR(100),
  Email NVARCHAR(100),
  Content NVARCHAR(MAX),
  CreatedAt DATETIME DEFAULT GETDATE()
);

INSERT INTO users (name, email, password)
VALUES 
  (N'Nguyễn Văn A', 'a@gmail.com', 'hashed_password_a'),
  (N'Trần Thị B', 'b@gmail.com', 'hashed_password_b'),
  (N'Lê Minh C', 'c@gmail.com', 'hashed_password_c'),
  (N'Phạm Hồng D', 'd@gmail.com', 'hashed_password_d');

INSERT INTO articles (title, content, image, category, user_id)
VALUES
  (N'Cách kiểm soát huyết áp tại nhà', N'Huyết áp cao cần được kiểm tra định kỳ...', 'https://suckhoedoisong.qltns.mediacdn.vn/324455921873985536/2024/10/24/co-tim-1729763955568534921178.jpg', N'Sức khỏe tim mạch', 1),
  (N'Cách quản lý căng thẳng hiệu quả', N'Học cách thở sâu, thiền định và xây dựng lối sống tích cực để giảm stress...', 'https://cdn.nhathuoclongchau.com.vn/unsafe/800x0/https://cms-prod.s3-sgn09.fptcloud.com/positive_stress_la_gi_cach_quan_ly_cang_thang_hieu_qua_2_f79e39bedd.jpg', N'Sức khỏe tinh thần', 2),
  (N'Tập thể dục đúng cách cho người lớn tuổi', N'Người cao tuổi nên đi bộ, yoga nhẹ...', 'https://cafefcdn.com/203337114487263232/2024/3/4/photo2024-03-0319-42-24-1709469850910307318592-1709553067620-1709553068102372735353.jpg', N'Lối sống', 1),
  (N'Tác hại của thói quen ngồi lâu', N'Ngồi lâu liên tục có thể gây đau lưng, thoái hóa cột sống và béo phì...', 'https://cdn.nhathuoclongchau.com.vn/unsafe/800x0/filters:quality(95)/https://cms-prod.s3-sgn09.fptcloud.com/dan_van_phong_da_biet_den_tac_hai_cua_ngoi_qua_lau_o_mot_cho_chua_2_1024x683_5faade8142.jpg', N'Bệnh mãn tính', 3),
  (N'Làm sao để ngủ ngon hơn', N'Một giấc ngủ chất lượng ảnh hưởng đến sức khỏe...', 'https://www.findjobs.vn//htdocs/images/news/202002/htdocs-images-NGU.jpg', N'Sức khỏe tinh thần', 2);

INSERT INTO comments (content, article_id, user_id)
VALUES
  (N'Bài viết rất bổ ích. Cảm ơn tác giả!', 1, 2),
  (N'Mình sẽ áp dụng thực đơn này từ hôm nay!', 2, 3),
  (N'Tập yoga buổi sáng đúng là hiệu quả.', 3, 4),
  (N'Mình cần tư vấn thêm về chế độ ăn cho người tiểu đường.', 4, 1),
  (N'Thường xuyên mất ngủ, sẽ thử các mẹo trong bài.', 5, 3),
  (N'Mình đo huyết áp mỗi sáng bằng máy điện tử.', 1, 4),
  (N'Muốn giảm cân mà không bị mất sức, bài này rất hay.', 2, 1);

select * from users;
select * from comments;
select * from ContactMessages;