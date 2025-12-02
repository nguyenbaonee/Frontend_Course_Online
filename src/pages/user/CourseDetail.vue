<template>
  <div v-if="course" class="course-page">
    <div class="course-header">
      <div class="course-left">
        <h1 class="course-title">{{ course.title }}</h1>
        <p class="course-sub">{{ course.description }}</p>
        <div class="course-meta">
          <el-tag type="success" effect="plain">Best Seller</el-tag>
          <span class="rating">
            <el-rate
                v-model="course.rating"
                disabled
                show-score
                :style="{
                '--el-rate-color': '#ff9900',
                '--el-rate-bg-color': '#ddd'
              }"
            />
          </span>
          <span>({{ course.reviews.length }} ratings · {{ course.students }} students)</span>
        </div>
      </div>

      <div class="course-right">
        <el-card class="course-card" shadow="hover">
          <img :src="`http://localhost:8089${course.image}`" alt="preview" class="preview" />
          <div class="price-box" v-if="course.price !== null">
            <span class="discounted">{{ formatPrice(course.price * (1 - course.discount / 100)) }}</span>
            <del class="original">{{ formatPrice(course.price) }}</del>
            <span class="discount" v-if="course.discount">{{ (course.discount) }}% OFF</span>
          </div>
          <el-button
              type="success"
              @click="addToCart(course.id)"
              :disabled="!isAuthenticated"
              class="add-to-cart-button">
            Thêm vào giỏ hàng
          </el-button>
        </el-card>
      </div>
    </div>

    <!-- What you'll learn -->
    <div class="learn-section" v-if="course.learn.length">
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
        <p>{{ course.descriptionDetail }}</p>
      </el-tab-pane>

      <el-tab-pane label="Instructor" name="instructor" v-if="course.instructor">
        <div class="instructor">
          <img :src="course.instructorAvatar" alt="" class="avatar" />
          <div>
            <h3>{{ course.instructor }}</h3>
            <p>{{ course.instructorTitle }}</p>
            <p>{{ course.instructorBio }}</p>
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="Reviews" name="reviews" v-if="course.reviews.length">
        <div v-for="review in course.reviews" :key="review.id" class="review-item">
          <strong>{{ review.user }}</strong>
          <el-rate v-model="review.rating" disabled />
          <p>{{ review.comment }}</p>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>

  <!-- Hiển thị khi khóa học chưa được tải -->
  <div v-else class="loading">Loading course...</div>

  <section class="related-courses">
    <h2>Các khóa học liên quan</h2>
    <el-row :gutter="20">
      <el-col :span="8" v-for="relatedCourse in relatedCourses" :key="relatedCourse.id">
        <div class="course-wrapper">
          <el-card :body-style="{ padding: '15px' }" shadow="hover" class="course-card">
            <img :src="`http://localhost:8089${relatedCourse.image}`" class="course-thumb" alt="thumbnail" />

            <h3>{{ relatedCourse.title }}</h3>
            <p class="desc">{{ relatedCourse.description }}</p>

            <div class="price">
              <span class="old-price" v-if="relatedCourse.discount">{{ formatPrice(relatedCourse.price) }}</span>
              <span class="new-price">{{ formatPrice(relatedCourse.discountedPrice) }}</span>
            </div>
            <router-link :to="`/course/${relatedCourse.id}`">
              <el-button type="primary" size="small">Xem chi tiết</el-button>
            </router-link>
          </el-card>
        </div>
      </el-col>
    </el-row>

    <!-- Phân trang -->
    <div class="pagination">
      <el-pagination
          :current-page="currentPage"
          :page-size="pageSize"
          :total="totalRelatedCourses"
          @current-change="handlePageChange"
      />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import {ElMessage} from "element-plus";

const route = useRoute()
const router = useRouter()

const course = ref(null)
const activeTab = ref('description')

const relatedCourses = ref([])
const currentPage = ref(1)
const pageSize = ref(6)
const totalRelatedCourses = ref(0)

const formatPrice = (value) => {
  if (value === null || value === undefined) return "0 ₫";

  const num = Number(value);
  if (isNaN(num)) return "0 ₫";

  return num.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};

const isAuthenticated = !!localStorage.getItem('accessToken')

// API call khi load trang
onMounted(async () => {
  const courseId = route.params.id
  try {
    const res = await axios.get(`http://localhost:8089/api/courses/${courseId}`, {
      params: { status: 'ACTIVE' }
    })
    const data = res.data
    // Map dữ liệu từ API về đúng structure
    course.value = {
      title: data.name,
      // Chọn thumbnail type THUMBNAIL và primary=true, fallback thumbnail đầu tiên
      image: data.thumbnail?.find(t => t.type === 'THUMBNAIL' && t.primary)?.url
          || data.thumbnail?.[0]?.url
          || '',
      description: data.description || '',
      descriptionDetail: data.descriptionDetail,
      instructor: data.author || '',        // author là string
      instructorAvatar: '',                 // nếu API không trả avatar
      instructorTitle: '',
      instructorBio: '',
      learn: data.lessons || [],
      reviews: data.reviews || [],
      price: data.price,
      discount: data.discount || 0,
      students: data.students || 0,
      rating: data.rating || 0,
      code: data.code,
      id:data.id
    }
    fetchRelatedCourses(course.value.code,course.value.id)
  } catch (err) {
    console.error('Lỗi khi lấy course:', err)
  }
})

const fetchRelatedCourses = async (courseCode,id) => {
  try {
    const res = await axios.get('http://localhost:8089/api/courses', {
      params: {
        code: courseCode,
        page: currentPage.value - 1, // Vì API dùng zero-indexed page
        size: pageSize.value,
        status: 'ACTIVE'
      }
    });
    relatedCourses.value = res.data.content.filter(c => c.id !== id).map(c => ({
      id: c.id,
      title: c.name,
      description: c.description,
      discountedPrice: c.discount ? Math.round(c.price * (1 - c.discount / 100)) : c.price,
      price: c.price,
      image: c.thumbnail[0]?.url || '', // lấy ảnh đầu tiên
    }));

    totalRelatedCourses.value = res.data.totalElements;
  } catch (err) {
    console.error('Lỗi khi lấy khóa học liên quan:', err);
  }
};
const handlePageChange = (page) => {
  currentPage.value = page
  fetchRelatedCourses(course.value.code) // Lấy lại khóa học liên quan cho trang mới
}
const addToCart = async (courseId) => {
  const userId = localStorage.getItem('userId')
  const quantity = 1
  const requestBody = {
    courseId,
    quantity,
    userId
  }

  try {
    const response = await axios.post('http://localhost:8099/carts/items', requestBody)
    ElMessage.success('Item added to cart successfully!')
    console.log('Item added to cart successfully:', response.data)
  } catch (error) {
    ElMessage.error('Error adding item to cart')
    console.error('Error adding item to cart:', error)
  }
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
.add-to-cart-button {
  margin-top: 20px;
  width: 100%;
  background-color: #f56c6c;
  color: #fff;
  font-weight: bold;
  border-radius: 5px;
  padding: 10px;
  transition: background-color 0.3s;
}

.add-to-cart-button:hover {
  background-color: #d9534f;
}

.add-to-cart-button:disabled {
  background-color: #ccc;
  color: #fff;
  cursor: not-allowed;
}

</style>
