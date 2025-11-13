<template>
  <div class="course-page" v-if="course">
    <!-- Header -->
    <div class="course-header">
      <div class="course-left">
        <h1 class="course-title">{{ course.title }}</h1>
        <p class="course-sub">
          Learn Web Development by building 25 websites and mobile apps using HTML, CSS,
          JavaScript, PHP, Python, MySQL & more!
        </p>
        <div class="course-meta">
          <el-tag type="success" effect="plain">Best Seller</el-tag>
          <span class="rating">
            <el-rate v-model="course.rating" disabled show-score text-color="#ff9900" />
            <span>({{ course.reviews.length }} ratings · {{ course.students }} students)</span>
          </span>
        </div>
      </div>
      <div class="course-right">
        <el-card class="course-card" shadow="hover">
          <img :src="course.image" alt="preview" class="preview" />
          <div class="price-box">
            <span class="discounted">{{ formatPrice(course.price * (1 - course.discount / 100)) }}</span>
            <del class="original">{{ formatPrice(course.price) }}</del>
            <span class="discount">({{ course.discount }}% OFF)</span>
          </div>
          <p class="time-left">⏰ 2 days left at this price!</p>
          <el-button type="primary" class="btn-buy" @click="buyNow">Buy Now</el-button>
          <el-button type="success" class="btn-cart" @click="addToCart">Add to Cart</el-button>
          <p class="wishlist">❤️ Add to Wishlist</p>
          <ul class="includes">
            <li>✔ 12 hours on-demand video</li>
            <li>✔ 45 downloadable resources</li>
            <li>✔ Full lifetime access</li>
            <li>✔ Access on mobile and TV</li>
            <li>✔ Certificate of completion</li>
          </ul>
        </el-card>
      </div>
    </div>

    <!-- What you'll learn -->
    <div class="learn-section">
      <h2>What you'll learn</h2>
      <div class="learn-grid">
        <div v-for="(item, index) in course.learn" :key="index" class="learn-item">
          <i class="el-icon-check"></i> {{ item }}
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <el-tabs v-model="activeTab" class="tabs-section">
      <el-tab-pane label="Description" name="description">
        <p>{{ course.description }}</p>
      </el-tab-pane>
      <el-tab-pane label="Curriculum" name="curriculum">
        <el-collapse accordion>
          <el-collapse-item title="Section 1: Introduction">
            <ul>
              <li>Welcome to the Course (10:32)</li>
              <li>Setting Up Your Environment (08:35)</li>
              <li>Course Project Overview (04:45)</li>
            </ul>
          </el-collapse-item>
          <el-collapse-item title="Section 2: HTML 5"></el-collapse-item>
          <el-collapse-item title="Section 3: CSS 3"></el-collapse-item>
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane label="Instructor" name="instructor">
        <div class="instructor">
          <img :src="course.instructorAvatar" alt="" class="avatar" />
          <div>
            <h3>{{ course.instructor }}</h3>
            <p>{{ course.instructorTitle }}</p>
            <p>{{ course.instructorBio }}</p>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Reviews" name="reviews">
        <div v-for="review in course.reviews" :key="review.id" class="review-item">
          <strong>{{ review.user }}</strong>
          <el-rate v-model="review.rating" disabled />
          <p>{{ review.comment }}</p>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>

  <div v-else class="loading">Loading course...</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const course = ref(null)
const activeTab = ref('description')

const courses = [
  {
    id: 1,
    title: 'The Complete Web Developer Course 2.0',
    description:
        'Learn full-stack web development by building real-world websites and mobile apps using HTML, CSS, JS, PHP, Python, and MySQL.',
    price: 64.99,
    discount: 82,
    rating: 4.7,
    students: 125000,
    instructor: 'John Doe',
    instructorTitle: 'Web Developer, Designer, and Teacher',
    instructorBio:
        'John has been a web developer for over 10 years, working for top tech companies. He is passionate about helping students achieve their tech career goals.',
    instructorAvatar: 'https://i.pravatar.cc/100?img=12',
    image: 'https://picsum.photos/400/250?random=11',
    learn: [
      'Build 25 beautiful, modern websites and mobile apps',
      'Master front-end development with HTML, CSS & JavaScript',
      'Learn back-end development with PHP, Python & Node.js',
      'Understand databases like MySQL and PostgreSQL',
      'Develop skills to become a freelance web developer',
      'Get a job as a junior web developer'
    ],
    reviews: [
      { id: 1, user: 'Minh', rating: 5, comment: 'Tuyệt vời! Giảng viên dạy dễ hiểu.' },
      { id: 2, user: 'Lan', rating: 4, comment: 'Nội dung đầy đủ, chi tiết.' }
    ]
  }
]

onMounted(() => {
  const courseId = Number(route.params.id) || 1
  course.value = courses.find(c => c.id === courseId)
})

const formatPrice = value => '$' + value.toFixed(2)

const addToCart = () => {
  router.push('/cart')
}

const buyNow = () => {
  router.push('/checkout')
}
</script>

<style scoped>
.course-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 20px;
  font-family: 'Inter', sans-serif;
}
.course-header {
  display: flex;
  gap: 40px;
  align-items: flex-start;
  margin-bottom: 50px;
}
.course-left {
  flex: 1;
}
.course-right {
  width: 360px;
}
.course-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 10px;
}
.course-sub {
  color: #555;
  margin-bottom: 15px;
}
.course-meta {
  display: flex;
  align-items: center;
  gap: 10px;
}
.course-card {
  padding: 0;
  overflow: hidden;
}
.preview {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
.price-box {
  margin: 15px;
  font-size: 1.2rem;
}
.discounted {
  color: #1e88e5;
  font-weight: 700;
  margin-right: 10px;
}
.original {
  color: #999;
  margin-right: 10px;
}
.discount {
  color: #f56c6c;
}
.time-left {
  color: #e53935;
  font-size: 0.9rem;
  margin-left: 15px;
}
.btn-buy,
.btn-cart {
  width: 90%;
  margin: 10px 5%;
}
.wishlist {
  text-align: center;
  font-size: 0.9rem;
  color: #666;
  margin-top: 5px;
}
.includes {
  list-style: none;
  padding: 10px 25px;
  font-size: 0.9rem;
  color: #333;
}
.includes li {
  margin-bottom: 5px;
}

.learn-section {
  margin: 40px 0;
}
.learn-section h2 {
  margin-bottom: 20px;
  font-size: 1.5rem;
}
.learn-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 10px 20px;
}
.learn-item {
  background: #f9fafc;
  padding: 10px 15px;
  border-radius: 8px;
}
.tabs-section {
  margin-top: 30px;
}
.instructor {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 10px;
}
.instructor .avatar {
  width: 100px;
  border-radius: 50%;
}
.review-item {
  border-bottom: 1px solid #eee;
  padding: 10px 0;
}
.loading {
  text-align: center;
  padding: 40px;
  font-size: 1.2rem;
}
</style>
