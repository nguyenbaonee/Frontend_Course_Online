<template>
  <div class="my-courses-page">
    <!-- Header -->
    <div class="header">
      <h1>My Courses</h1>
      <div class="filters">
        <el-button
            v-for="tab in tabs"
            :key="tab.value"
            :type="activeTab === tab.value ? 'primary' : 'default'"
            plain
            round
            size="small"
            @click="activeTab = tab.value"
        >
          {{ tab.label }}
        </el-button>
      </div>
    </div>

    <!-- Courses Grid -->
    <div class="courses-grid">
      <el-card
          v-for="course in filteredCourses"
          :key="course.id"
          class="course-card"
          shadow="hover"
      >
        <img :src="course.image" alt="course cover" class="cover" />
        <div class="info">
          <h3 class="title">{{ course.title }}</h3>
          <p class="instructor">by {{ course.instructor }}</p>
          <div class="progress-section">
            <div class="progress-bar">
              <div
                  class="progress-fill"
                  :style="{ width: course.progress + '%' }"
              ></div>
            </div>
            <p class="progress-text">{{ course.progress }}% complete</p>
          </div>
          <el-button type="primary" size="small" class="btn-learn">
            Vào học
          </el-button>
        </div>
      </el-card>
    </div>

    <div v-if="filteredCourses.length === 0" class="empty">
      No courses found in this category.
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const tabs = [
  { label: 'All', value: 'all' },
  { label: 'In Progress', value: 'inprogress' },
  { label: 'Completed', value: 'completed' },
  { label: 'Not Started', value: 'notstarted' },
]

const activeTab = ref('all')

const courses = ref([
  {
    id: 1,
    title: 'Mastering Vue.js 3',
    instructor: 'John Doe',
    progress: 75,
    status: 'inprogress',
    image: 'https://picsum.photos/400/220?random=11',
  },
  {
    id: 2,
    title: 'Advanced CSS and Sass',
    instructor: 'Jane Smith',
    progress: 30,
    status: 'inprogress',
    image: 'https://picsum.photos/400/220?random=12',
  },
  {
    id: 3,
    title: 'The Complete JavaScript Course 2024',
    instructor: 'Alex Johnson',
    progress: 100,
    status: 'completed',
    image: 'https://picsum.photos/400/220?random=13',
  },
  {
    id: 4,
    title: 'React for Beginners',
    instructor: 'Sara Lee',
    progress: 0,
    status: 'notstarted',
    image: 'https://picsum.photos/400/220?random=14',
  },
])

const filteredCourses = computed(() => {
  if (activeTab.value === 'all') return courses.value
  return courses.value.filter((c) => c.status === activeTab.value)
})
</script>

<style scoped>
.my-courses-page {
  max-width: 1100px;
  margin: 40px auto;
  padding: 0 20px;
  font-family: 'Inter', 'Segoe UI', sans-serif;
}

.header {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 25px;
}

.header h1 {
  font-weight: 700;
  font-size: 1.8rem;
  color: #0a0a0a;
}

.filters {
  display: flex;
  gap: 10px;
}

.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
}

.course-card {
  border: none;
  border-radius: 16px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  padding: 0;
  transition: all 0.25s ease;
}

.course-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.08);
}

.cover {
  width: 100%;
  height: 160px;
  object-fit: cover;
}

.info {
  padding: 15px 20px 20px;
}

.title {
  font-size: 1rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 4px;
}

.instructor {
  font-size: 0.9rem;
  color: #777;
  margin-bottom: 12px;
}

.progress-section {
  margin-bottom: 15px;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #eaeaea;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 4px;
}

.progress-fill {
  height: 100%;
  background-color: #007bff;
  border-radius: 4px;
  transition: width 0.4s ease;
}

.progress-text {
  font-size: 0.8rem;
  color: #555;
}

.btn-learn {
  width: 100%;
  border-radius: 10px;
  font-weight: 600;
}

.empty {
  text-align: center;
  color: #888;
  margin-top: 40px;
  font-size: 1rem;
}

/* Responsive */
@media (max-width: 768px) {
  .filters {
    flex-wrap: wrap;
  }
}
</style>
