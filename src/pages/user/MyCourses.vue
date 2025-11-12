<template>
  <div class="purchased-courses-page">
    <h1>Khóa học của tôi</h1>

    <div v-if="courses.length === 0" class="empty">
      Bạn chưa mua khóa học nào.
    </div>

    <div v-else class="courses-list">
      <div v-for="course in courses" :key="course.id" class="course-card">
        <img :src="course.image" alt="" class="course-img"/>
        <div class="course-info">
          <h3>{{ course.title }}</h3>
          <p class="instructor">Tác giả: {{ course.instructor }}</p>
          <p class="description">{{ course.description }}</p>
          <div class="progress-wrapper">
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: course.progress + '%' }"></div>
            </div>
            <span>{{ course.progress }}% hoàn thành</span>
          </div>
          <el-button type="primary" size="small">Vào học</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const courses = ref([
  {
    id: 1,
    title: 'Vue 3 từ cơ bản đến nâng cao',
    instructor: 'Nguyễn Văn A',
    description: 'Học Vue 3 Composition API, Router, Pinia, tối ưu hiệu suất.',
    progress: 45,
    image: 'https://picsum.photos/300/150?random=1',
  },
  {
    id: 2,
    title: 'ReactJS căn bản',
    instructor: 'Trần Thị B',
    description: 'Học ReactJS, Hooks, State Management, làm dự án thực tế.',
    progress: 100,
    image: 'https://picsum.photos/300/150?random=2',
  },
  {
    id: 3,
    title: 'NodeJS + Express',
    instructor: 'Lê Văn C',
    description: 'Xây dựng API với NodeJS & Express, kết nối database.',
    progress: 70,
    image: 'https://picsum.photos/300/150?random=3',
  },
])
</script>

<style scoped>
.purchased-courses-page {
  max-width: 900px;
  margin: 30px auto;
  padding: 0 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

h1 {
  margin-bottom: 25px;
}

.empty {
  text-align: center;
  color: #666;
  font-size: 1rem;
}

.courses-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.course-card {
  display: flex;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0,0,0,0.05);
  padding: 15px;
  gap: 20px;
  align-items: flex-start;
}

.course-img {
  width: 200px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
}

.course-info {
  flex: 1;
}

.course-info h3 {
  margin: 0 0 5px 0;
  font-size: 1.2rem;
  color: #333;
}

.instructor {
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 5px;
}

.description {
  font-size: 0.95rem;
  color: #444;
  margin-bottom: 10px;
}

/* Progress bar */
.progress-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.progress-bar {
  flex: 1;
  height: 8px;
  background-color: #eee;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: #409eff;
  border-radius: 4px 0 0 4px;
  transition: width 0.3s;
}

/* Button */
.el-button {
  border-radius: 8px;
  font-weight: 600;
}

/* Responsive */
@media (max-width: 768px) {
  .course-card {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .course-img {
    width: 100%;
    height: auto;
  }
  .course-info {
    width: 100%;
  }
  .progress-wrapper {
    justify-content: center;
  }
}
</style>
