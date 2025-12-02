<template>
  <div class="category-layout">
    <!-- Sidebar bên trái (SidebarPromotions) -->
    <div class="sidebar">
      <Promotions />
    </div>

    <!-- Nội dung hiển thị khóa học ở bên phải -->
    <div class="search-results">
      <el-row :gutter="20" class="mt-4">
        <el-col
            v-for="course in courses"
            :key="course.id"
            :xs="24" :sm="12" :md="8" :lg="6"
        >
          <div class="course-card" @click="goToCourseDetail(course)">
            <img :src="`http://localhost:8089${course.image}`" alt="course image" class="course-image" />
            <div class="course-info">
              <h3 class="course-title">{{ course.title }}</h3>
              <p class="course-author">
                Giảng viên: {{ course.author || 'Đang cập nhật' }} • {{ course.students || 0 }} học viên
              </p>
              <div class="course-price">
                <span v-if="course.discount" class="price-old">{{ formatPrice(course.price) }}</span>
                <span class="price-current">{{ formatPrice(course.discount || course.price) }}</span>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>

      <div v-if="courses.length === 0" class="no-result">
        Không tìm thấy khóa học nào.
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import Promotions from "../../components/Promotions.vue";

const route = useRoute()
const router = useRouter()

const form = reactive({
  title: '',
  author: ''
})

const courses = ref([])

const formatPrice = (price) => {
  if (!price) return '0₫'
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
}

// Fetch khóa học
const fetchCourses = async (query = {}) => {
  try {
    const params = { page: 0, size: 20, status: 'ACTIVE' }
    if (query.name && query.name.trim() !== '') params.name = query.name
    if (query.author && query.author.trim() !== '') params.author = query.author

    const res = await axios.get('http://localhost:8089/api/courses', { params })

    courses.value = res.data.content.map(c => ({
      id: c.id,
      title: c.name,
      author: c.author,
      price: c.price,
      discount: null,
      students: 0,
      image: c.thumbnail?.length
          ? c.thumbnail.find(t => t.primary)?.url || c.thumbnail[0].url
          : 'https://via.placeholder.com/400x200'
    }))
  } catch (err) {
    console.error(err)
    courses.value = []
  }
}

// Khi mounted, gán query param q vào form.title và fetch
onMounted(() => {
  if (route.query.q) {
    form.title = route.query.q
  }
  fetchCourses({ name: form.title, author: form.author })
})

// Watch query param q (Navbar search)
watch(() => route.query.q, (newQ) => {
  form.title = newQ || ''
  fetchCourses({ name: form.title, author: form.author })
})

// Search button
const onSearch = () => {
  router.push({ name: 'search', query: { q: form.title } })
}

// Chuyển qua trang courseDetail
const goToCourseDetail = (course) => {
  router.push({
    name: 'courseDetail',
    params: {
      id: course.id,
      name: course.title,
      author: course.author
    }
  })
}
</script>

<style scoped>
.category-layout {
  display: flex; /* Sử dụng flex để chia layout thành hai phần */
  gap: 20px; /* Khoảng cách giữa sidebar và content */
  padding: 20px;
}

.sidebar {
  flex: 0 0 300px; /* Sidebar có chiều rộng cố định */
  position: sticky;
  top: 20px; /* Đảm bảo sidebar không di chuyển khi cuộn */
}

.search-results {
  flex: 1; /* Phần nội dung chính chiếm phần còn lại */
  padding: 20px;
}

.course-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.08);
  margin-bottom: 20px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}
.course-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.12);
}

.course-image {
  width: 100%;
  height: 160px;
  object-fit: cover;
}

.course-info {
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.course-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  min-height: 40px;
}

.course-author {
  font-size: 14px;
  color: #888;
}

.course-price {
  display: flex;
  gap: 8px;
  align-items: center;
}

.price-old {
  text-decoration: line-through;
  color: #bbb;
}

.price-current {
  font-weight: bold;
  color: #f56c6c;
}

.no-result {
  text-align: center;
  color: #888;
  margin-top: 40px;
  font-size: 18px;
}

.search-form {
  margin-bottom: 20px;
}
</style>
