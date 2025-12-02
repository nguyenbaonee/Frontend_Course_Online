<template>
  <div class="home-container">
    <!-- 🟦 Hero Section with Auto Slider -->
    <section class="hero">
      <el-carousel :interval="3500" type="card" height="250px" indicator-position="outside">
        <el-carousel-item v-for="banner in banners" :key="banner.id">
          <img :src="`http://localhost:8686${banner.imageUrl}`" class="hero-image" />
        </el-carousel-item>
      </el-carousel>
      <div class="hero-content">
        <h1>Khám phá tri thức – Mở khóa tương lai của bạn </h1>
        <p>Hàng trăm khóa học chất lượng cao từ giảng viên hàng đầu.</p>
        <el-button type="warning" size="large" round @click="handleExplore">Khám phá ngay</el-button>
      </div>
    </section>

    <!-- 🎓 Featured Courses -->
    <section class="featured">
      <h2>Khóa học nổi bật</h2>
      <el-row :gutter="20">
        <el-col :span="8" v-for="course in courses" :key="course.id">
          <div class="course-wrapper"
               @mouseenter="hoveredCourse = course.id"
               @mouseleave="hoveredCourse = null">

            <el-card :body-style="{ padding: '15px' }" shadow="hover" class="course-card">
              <img :src="`http://localhost:8089${course.image}`" class="course-thumb" alt="thumbnail" />

              <h3>{{ course.title }}</h3>
              <p class="desc">{{ course.description }}</p>

              <div class="price">
                <span class="old-price" v-if="course.discount">{{ formatPrice(course.price) }}</span>
                <span class="new-price">{{ formatPrice(discounted(course)) }}</span>
              </div>
              <router-link :to="`/course/${course.id}`">
                <el-button type="primary" size="small">Xem chi tiết</el-button>
              </router-link>
            </el-card>

            <!-- 🎈 Hover Detail Tooltip -->
            <transition name="fade">
              <div v-if="hoveredCourse === course.id" class="hover-info">
                <p><strong>Giảng viên:</strong> {{ course.author }}</p>
                <p><strong>Lượt mua:</strong> {{ formatNumber(course.purchases) }} học viên</p>
                <p><strong>Kiến thức học được:</strong></p>
                <p>{{ course.descriptionDetail }}</p>
              </div>
            </transition>
          </div>
        </el-col>
      </el-row>
    </section>

    <!-- 🧭 CTA Section -->
    <section class="cta">
      <h2>Bắt đầu hành trình học tập của bạn hôm nay!</h2>
      <p>Tham gia cùng hàng ngàn học viên đang nâng cao kỹ năng mỗi ngày.</p>
      <!-- Chỉ hiển thị nút đăng ký nếu không có accessToken -->
      <router-link v-if="!isAuthenticated" to="/auth/register">
        <el-button type="primary">Đăng ký ngay</el-button>
      </router-link>
    </section>
  </div>
</template>


<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const isAuthenticated = computed(() => !!localStorage.getItem('accessToken'))  // Kiểm tra accessToken

const banners = ref([])
const courses = ref([])
const hoveredCourse = ref(null)


/* 🖼 Lấy banner */
const fetchBanners = async () => {
  try {
    const res = await axios.get(`http://localhost:8686/banners`, {
      params: {
        position: 'MENU',
        status: 'ACTIVE'
      }
    })

    banners.value = res.data
  } catch (err) {
    console.error('Lấy banner thất bại', err)
  }
}


const fetchCourses = async () => {
  try {
    const res = await axios.get(`http://localhost:8089/api/courses`, {
      params: { page: 0, size: 6, status: 'ACTIVE' }
    })
    courses.value = res.data.content.map(c => ({
      id: c.id,
      title: c.name,
      description: c.description,
      descriptionDetail: c.descriptionDetail,
      image: c.thumbnail[0]?.url || '', // lấy ảnh đầu tiên
      price: c.price,
      discount: c.discount,
      author: c.author,
      topics: c.topics,
      purchases: c.purchases
    }))
  } catch (err) {
    console.error('Lấy khóa học thất bại', err)
  }
}


/* 🌟 Handle explore button */
const handleExplore = () => {
  router.push(isAuthenticated.value ? '/courses' : '/auth/login')
}

/* 🏁 Mounted */
onMounted(() => {
  fetchBanners()
  fetchCourses()
})

/* 📊 Utils */
const discounted = (course) =>
    course.discount ? Math.round(course.price * (1 - course.discount / 100)) : course.price

const formatPrice = (value) => {
  if (value === null || value === undefined) return "0 ₫";

  const num = Number(value);
  if (isNaN(num)) return "0 ₫";

  return num.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};

const formatNumber = (value)  => {
  if (value === null || value === undefined) return "0";
  const num = Number(value);
  if (isNaN(num)) return "0";
  return num.toLocaleString("vi-VN");
}
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  gap: 60px;
  padding-top: 20px;
}

/* 🟦 HERO */
.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background: linear-gradient(135deg, #409eff, #66b1ff);
  color: white;
  text-align: center;
  border-radius: 0 0 40px 40px;
  padding: 20px;

  width: 100vw; /* full viewport width */
  max-width: 100%; /* tránh overflow */
}
.hero >>> .el-carousel {
  width: 100%; /* full width */
  max-width: 1200px; /* optional: giới hạn chiều ngang */
}

.hero-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 10px;
}

.hero-content {
  position: relative; /* không cần absolute */
  background: rgba(0,0,0,0.3);
  padding: 25px 40px;
  border-radius: 20px;
  backdrop-filter: blur(3px);
}

.hero-content h1 {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 10px;
}

.hero-content p {
  font-size: 18px;
  margin-bottom: 20px;
}

/* 🎓 FEATURED */
.featured {
  padding: 40px;
  text-align: center;
}

.featured h2 {
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 30px;
}

.course-wrapper {
  position: relative;
}

.course-card {
  border-radius: 16px;
  overflow: hidden;
  background: #fff;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.course-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.15);
}

.course-thumb {
  width: 100%;
  border-radius: 10px;
  margin-bottom: 10px;
}

.desc {
  font-size: 14px;
  color: #666;
  min-height: 48px;
}

.price {
  margin: 10px 0;
}

.old-price {
  text-decoration: line-through;
  color: #aaa;
  margin-right: 5px;
  font-size: 14px;
}

.new-price {
  color: #ff4d4f;
  font-weight: bold;
  font-size: 16px;
}

/* 🎈 Hover Info (Popup chi tiết khi trỏ vào khóa học) */
.hover-info {
  position: absolute;
  bottom: 110%;
  left: 50%;
  transform: translateX(-50%);
  width: 95%;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 14px 18px;
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.12);
  text-align: left;
  z-index: 20;
  animation: popIn 0.25s ease-out;
  font-size: 14px;
  color: #333;
}

.hover-info::after {
  content: "";
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  border-width: 8px;
  border-style: solid;
  border-color: #fff transparent transparent transparent;
  filter: drop-shadow(0 -1px 2px rgba(0, 0, 0, 0.1));
}

.hover-info strong {
  color: #409eff;
}

.hover-info ul {
  margin: 8px 0 0 18px;
  padding: 0;
  list-style-type: disc;
}

.hover-info li {
  margin: 3px 0;
  font-size: 13.5px;
  color: #555;
}

/* Hiệu ứng xuất hiện mượt */
@keyframes popIn {
  from {
    opacity: 0;
    transform: translate(-50%, 10%) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0) scale(1);
  }
}

/* CTA */
.cta {
  background: #f5f5f5;
  padding: 60px 20px;
  text-align: center;
  border-radius: 30px;
}

.cta h2 {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 10px;
}

.cta p {
  font-size: 16px;
  color: #555;
  margin-bottom: 20px;
}
</style>

