<template>
  <div class="dashboard-page">
    <!-- Statistic Cards -->
    <section class="stats">
      <el-row :gutter="20">
        <el-col :span="6" v-for="stat in stats" :key="stat.title">
          <el-card class="stat-card">
            <div class="stat-title">{{ stat.title }}</div>
            <div class="stat-value">{{ stat.value }}</div>
          </el-card>
        </el-col>
      </el-row>
    </section>

    <!-- Courses Table -->
    <section class="courses-table">
      <h3>Danh sách khóa học</h3>
      <el-table :data="courses" style="width: 100%" stripe>
        <el-table-column prop="id" label="ID" width="60"/>
        <el-table-column prop="title" label="Tiêu đề"/>
        <el-table-column prop="author" label="Giảng viên"/>
        <el-table-column prop="price" label="Giá"/>
        <el-table-column prop="students" label="Học viên"/>
        <el-table-column label="Hành động" width="140">
          <template #default="scope">
            <el-button type="primary" size="mini">Sửa</el-button>
            <el-button type="danger" size="mini">Xóa</el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const stats = ref([
  { title: 'Khóa học', value: 24 },
  { title: 'Người dùng', value: 1240 },
  { title: 'Doanh thu', value: '1,234,000₫' },
  { title: 'Học viên mới', value: 56 }
])

const courses = ref([
  { id: 1, title: 'Vue 3 từ cơ bản đến nâng cao', author: 'Nguyễn Bảo', price: '599,000₫', students: 123 },
  { id: 2, title: 'ReactJS + TypeScript', author: 'Lê Minh Tùng', price: '799,000₫', students: 243 },
  { id: 3, title: 'NodeJS & Express', author: 'Phạm Duy An', price: '499,000₫', students: 98 }
])
</script>

<style scoped>
.stats {
  padding: 20px 30px;
}

.stat-card {
  text-align: center;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.08);
  transition: transform 0.2s;
}
.stat-card:hover {
  transform: translateY(-4px);
}

.stat-title {
  font-size: 14px;
  color: #888;
}
.stat-value {
  font-size: 24px;
  font-weight: 600;
  margin-top: 10px;
  color: #409EFF;
}

.courses-table {
  padding: 20px 30px;
}

.courses-table h3 {
  margin-bottom: 15px;
  color: #333;
}
</style>
