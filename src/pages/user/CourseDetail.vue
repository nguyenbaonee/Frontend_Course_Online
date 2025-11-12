<template>
  <div class="course-detail" v-if="course">
    <div class="course-main">
      <img :src="course.image" alt="" class="course-image"/>
      <div class="course-info">
        <h1 class="course-title">{{ course.title }}</h1>

        <!-- Rating -->
        <div class="course-rating">
          <span v-for="n in 5" :key="n">
            <i class="star" :class="{ filled: n <= course.rating }">★</i>
          </span>
          <span>({{ course.reviews.length }} đánh giá)</span>
        </div>

        <!-- Giá & discount -->
        <p class="course-price">
          <span v-if="course.discount">
            <del>{{ formatPrice(course.price) }}</del>
            <strong>{{ formatPrice(course.price * (1 - course.discount / 100)) }}</strong>
          </span>
          <span v-else>{{ formatPrice(course.price) }}</span>
        </p>

        <!-- Action buttons -->
        <div class="course-actions">
          <el-button type="success" @click="addToCart">Thêm vào giỏ hàng</el-button>
          <el-button type="primary" @click="buyNow">Mua ngay</el-button>
        </div>

        <!-- Quick info -->
        <ul class="course-meta">
          <li><strong>Level:</strong> {{ course.level }}</li>
          <li><strong>Thời lượng:</strong> {{ course.duration }}</li>
          <li><strong>Giảng viên:</strong> {{ course.instructor }}</li>
        </ul>
      </div>
    </div>

    <!-- Tabs thông tin khóa học -->
    <div class="course-tabs">
      <el-tabs v-model="activeTab">
        <el-tab-pane label="Mô tả" name="description">
          <p>{{ course.description }}</p>
        </el-tab-pane>
        <el-tab-pane label="Yêu cầu" name="requirements">
          <ul>
            <li v-for="(req, index) in course.requirements" :key="index">{{ req }}</li>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="Đánh giá" name="reviews">
          <div v-for="review in course.reviews" :key="review.id" class="review-item">
            <strong>{{ review.user }}</strong>
            <span class="review-rating">
              <span v-for="n in 5" :key="n" class="star" :class="{ filled: n <= review.rating }">★</span>
            </span>
            <p>{{ review.comment }}</p>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>

  <div v-else>Đang tải khóa học...</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// MOCK DATA nâng cấp
const coursesList = [
  {
    id: 1,
    title: 'Vue 3 từ cơ bản đến nâng cao',
    description: 'Học Vue 3 Composition API, Router, Pinia, và tối ưu hiệu suất.',
    price: 599000,
    discount: 20,
    level: 'Nâng cao',
    duration: '20 giờ',
    instructor: 'Nguyễn Văn A',
    image: 'https://picsum.photos/400/200?random=1',
    requirements: ['Có kiến thức cơ bản về HTML/CSS', 'Hiểu JS cơ bản'],
    rating: 4,
    reviews: [
      { id: 1, user: 'Minh', rating: 5, comment: 'Khóa học rất hay!' },
      { id: 2, user: 'Lan', rating: 4, comment: 'Học xong áp dụng được ngay.' },
    ],
  },
  {
    id: 2,
    title: 'ReactJS căn bản',
    description: 'Học ReactJS, Hooks, State Management, và làm dự án thực tế.',
    price: 499000,
    discount: 15,
    level: 'Cơ bản',
    duration: '15 giờ',
    instructor: 'Trần Thị B',
    image: 'https://picsum.photos/400/200?random=2',
    requirements: ['Biết JS cơ bản', 'Hiểu HTML/CSS'],
    rating: 5,
    reviews: [
      { id: 1, user: 'Huy', rating: 5, comment: 'Rất dễ hiểu!' },
    ],
  },
]

const route = useRoute()
const router = useRouter()
const course = ref(null)
const cart = ref([])
const activeTab = ref('description')

const courseId = Number(route.params.id)

onMounted(() => {
  course.value = coursesList.find(c => c.id === courseId)
})

const formatPrice = (value) => value.toLocaleString('vi-VN') + '₫'

const addToCart = () => {
  cart.value.push(course.value)
  router.push('/cart')
}

const buyNow = () => {
  cart.value.push(course.value)
  router.push('/checkout')
}
</script>

<style scoped>
.course-main {
  display: flex;
  gap: 20px;
}
.course-image {
  width: 400px;
  border-radius: 8px;
}
.course-title {
  font-size: 2rem;
  margin-bottom: 10px;
}
.course-rating .star {
  color: #ccc;
  margin-right: 2px;
}
.course-rating .star.filled {
  color: #f5a623;
}
.course-price del {
  color: #999;
  margin-right: 10px;
}
.course-actions {
  margin: 20px 0;
  display: flex;
  gap: 10px;
}
.course-meta {
  list-style: none;
  padding: 0;
  margin-top: 10px;
}
.course-meta li {
  margin-bottom: 5px;
}
.review-item {
  border-bottom: 1px solid #eee;
  padding: 10px 0;
}
.review-rating .star {
  color: #f5a623;
  margin-right: 2px;
}
</style>
