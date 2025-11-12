                                                                                                                                                                 <template>
  <div class="search-results">
    <el-row :gutter="20">
      <el-col
          v-for="course in courses"
          :key="course.id"
          :xs="24" :sm="12" :md="8" :lg="6"
      >
        <div class="course-card">
          <img :src="course.image" alt="course image" class="course-image" />
          <div class="course-info">
            <h3 class="course-title">{{ course.title }}</h3>
            <p class="course-author">
              Giảng viên: {{ course.author }} • {{ course.students }} học viên
            </p>
            <div class="course-price">
              <span v-if="course.discount" class="price-old">{{ formatPrice(course.price) }}</span>
              <span class="price-current">{{ formatPrice(course.discount || course.price) }}</span>
            </div>
            <router-link :to="'/course/'+course.id">
              <el-button type="success" size="small" @click="$emit('buy', course)">Mua khóa học</el-button>
            </router-link>
            <router-link :to="'/course/'+course.id">
              <el-button type="success" size="small" @click="$emit('buy', course)">Thêm vào giỏ hàng</el-button>
            </router-link>
          </div>
        </div>
      </el-col>
    </el-row>
    <div v-if="courses.length === 0" class="no-result">
      Không tìm thấy khóa học nào.
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const courses = ref([
  {
    id: 1,
    title: 'Học ReactJS từ cơ bản đến nâng cao',
    author: 'Nguyễn Văn A',
    price: 1500000,
    discount: 1200000,
    students: 1240,
    image: 'https://picsum.photos/400/200?random=1'
  },
  {
    id: 2,
    title: 'Vue 3 + Composition API cho người mới',
    author: 'Trần Thị B',
    price: 1000000,
    discount: null,
    students: 980,
    image: 'https://picsum.photos/400/200?random=2'
  },
  {
    id: 3,
    title: 'NodeJS + Express xây dựng API thực tế',
    author: 'Lê Văn C',
    price: 1200000,
    discount: 950000,
    students: 870,
    image: 'https://picsum.photos/400/200?random=3'
  },
  {
    id: 4,
    title: 'Fullstack JavaScript: React + Node + MongoDB',
    author: 'Phạm Thị D',
    price: 2000000,
    discount: 1800000,
    students: 1540,
    image: 'https://picsum.photos/400/200?random=4'
  },
  {
    id: 5,
    title: 'Thiết kế UI/UX với Figma cho người mới',
    author: 'Nguyễn Văn E',
    price: 800000,
    discount: 650000,
    students: 680,
    image: 'https://picsum.photos/400/200?random=5'
  }
])

const formatPrice = (price) => {
  if (!price) return '0₫'
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
}
</script>

<style scoped>
.search-results {
  padding: 20px;
}

/* Card style */
.course-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
}
.course-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
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
  line-height: 1.2;
  color: #333;
  min-height: 40px;
}

.course-author {
  font-size: 14px;
  color: #888;
}

.course-price {
  display: flex;
  align-items: center;
  gap: 8px;
}

.price-old {
  text-decoration: line-through;
  color: #bbb;
  font-size: 14px;
}

.price-current {
  font-size: 16px;
  font-weight: bold;
  color: #f56c6c;
}

.no-result {
  text-align: center;
  color: #888;
  margin-top: 40px;
  font-size: 18px;
}
</style>
