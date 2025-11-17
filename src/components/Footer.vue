<template>
  <footer class="footer">
    <div class="footer-container">
      <!-- Cột 1 -->
      <div class="footer-section">
        <h2 class="footer-logo">EduNovel</h2>
        <p class="footer-desc">
          Nền tảng giáo dục uy tín và chất lượng cao, hãy trao niềm tin để nhận cơ hội.
        </p>
      </div>

      <!-- Cột 2 -->
      <div class="footer-section">
        <h3>Điều hướng</h3>
        <ul>
          <li><a href="#">Trang chủ</a></li>
          <li><a href="#">Tất cả các khóa học</a></li>
          <li><a href="#">Blog</a></li>
          <li><a href="#">Giới thiệu</a></li>
        </ul>
      </div>

      <!-- Cột 3 -->
      <div class="footer-section">
        <h3>About Us</h3>
        <ul>
          <li><a href="#">Tuyển dụng</a></li>
          <li><a href="#">Liên hệ</a></li>
        </ul>
      </div>

      <!-- Cột 4 -->
      <div class="footer-section">
        <h3>Ưu đãi dành riêng cho bạn</h3>
        <p>Bạn muốn nhận thông báo qua đâu</p>
        <div class="subscribe">
          <input type="email" placeholder="Nhập email của bạn..." />
          <button>Đăng ký</button>
        </div>
      </div>
    </div>

    <div class="footer-divider"></div>

    <!-- Icon -->
    <div class="footer-bottom">
      <div class="footer-social">
        <a href="#"><i class="fab fa-facebook-f"></i></a>
        <a href="#"><i class="fab fa-instagram"></i></a>
        <a href="#"><i class="fab fa-youtube"></i></a>
        <a href="#"><i class="fab fa-twitter"></i></a>
      </div>

      <div class="footer-copy">
        <p>© 2024 CoursePlatform. All Rights Reserved.</p>
        <div class="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
.footer {
  background-color: #1e2a38;
  color: #d1d5db;
  padding: 60px 40px 30px;
  font-family: "Inter", sans-serif;
  border-radius: 12px;
}

/* --- Grid layout --- */
.footer-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 40px;
  margin-bottom: 30px;
}

/* --- Cột --- */
.footer-section h3 {
  color: #ffffff;
  font-size: 16px;
  margin-bottom: 15px;
  font-weight: 600;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  margin-bottom: 10px;
}

.footer-section ul li a {
  color: #d1d5db;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s ease;
}

.footer-section ul li a:hover {
  color: #60a5fa;
}

/* --- Logo --- */
.footer-logo {
  color: #ffffff;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 10px;
}

.footer-desc {
  color: #9ca3af;
  font-size: 14px;
  line-height: 1.6;
}

/* --- Subscribe --- */
.subscribe {
  display: flex;
  margin-top: 10px;
}

.subscribe input {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 6px 0 0 6px;
  outline: none;
}

.subscribe button {
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 0 6px 6px 0;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.subscribe button:hover {
  background-color: #2563eb;
}

/* --- Divider --- */
.footer-divider {
  height: 1px;
  background-color: #374151;
  margin: 30px 0;
}

/* --- Bottom --- */
.footer-bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.footer-social {
  display: flex;
  gap: 15px;
}

.footer-social a {
  color: #d1d5db;
  font-size: 18px;
  transition: color 0.3s ease;
}

.footer-social a:hover {
  color: #60a5fa;
}

.footer-copy {
  text-align: center;
  font-size: 13px;
  color: #9ca3af;
}

.footer-links {
  margin-top: 5px;
}

.footer-links a {
  color: #9ca3af;
  margin: 0 10px;
  text-decoration: none;
}

.footer-links a:hover {
  color: #60a5fa;
}
</style>

<!-- FontAwesome -->
<link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
/>
