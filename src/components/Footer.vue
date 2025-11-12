<template>
  <footer class="footer">
    <p>© 2025 My Online Courses</p>
    <div class="social-links">
      <span>Tìm hiểu thêm về chúng tôi:</span>
      <a href="https://www.instagram.com" target="_blank" rel="noopener" class="social-link">
        <i class="fab fa-instagram"></i>
      </a>
      <a href="https://www.facebook.com" target="_blank" rel="noopener" class="social-link">
        <i class="fab fa-facebook-f"></i>
      </a>
      <a href="https://www.youtube.com" target="_blank" rel="noopener" class="social-link">
        <i class="fab fa-youtube"></i>
      </a>
    </div>
  </footer>
</template>

<script setup>
// Không cần JS riêng cho footer tĩnh
</script>

<style scoped>
/* Footer toàn trang */
.footer {
  width: 100%;
  padding: 30px 20px;
  background: #409eff;
  color: #ffffff;
  font-weight: 600;
  font-size: 14px;
  box-shadow: 0 -4px 15px rgba(0, 0, 0, 0.2);
  border-radius: 12px 12px 0 0; /* bo tròn góc trên */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* Social links */
.social-links {
  margin-top: 15px;
  display: flex;
  gap: 15px;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
}

.social-links span {
  margin-right: 10px;
  font-weight: 500;
}

/* Icon link */
.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: #ffd04b; /* màu nổi bật */
  color: #409eff;
  border-radius: 50%; /* bo tròn */
  text-decoration: none;
  font-size: 18px;
  transition: all 0.3s ease;
}

.social-link:hover {
  transform: scale(1.2);
  background: #fff;
  color: #409eff;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}
</style>

<!-- Lưu ý: cần load FontAwesome để hiển thị icon -->
<!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"> -->
