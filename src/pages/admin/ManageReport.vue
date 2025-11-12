<template>
  <div class="manager-report">
    <!-- Header / Filter -->
    <div class="report-header">
      <el-date-picker
          v-model="dateRange"
          type="daterange"
          start-placeholder="Từ ngày"
          end-placeholder="Đến ngày"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
      ></el-date-picker>
      <el-button type="primary" @click="applyFilter">Lọc</el-button>
    </div>

    <!-- Top courses -->
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="report-card">
          <h3>Top khóa học bán chạy</h3>
          <el-table :data="topSelling" stripe style="width:100%">
            <el-table-column prop="title" label="Khóa học"/>
            <el-table-column prop="students" label="Học viên"/>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="report-card">
          <h3>Top khóa học được tìm kiếm nhiều</h3>
          <el-table :data="topSearched" stripe style="width:100%">
            <el-table-column prop="title" label="Khóa học"/>
            <el-table-column prop="searchCount" label="Lượt tìm kiếm"/>
          </el-table>
        </el-card>
      </el-col>
    </el-row>

    <!-- Revenue chart -->
    <el-card class="report-card" style="margin-top:20px;">
      <h3>Doanh thu theo tháng</h3>
      <canvas id="revenueChart"></canvas>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Chart from 'chart.js/auto'

const dateRange = ref([])

// Demo dữ liệu
const topSelling = ref([
  { title: 'Vue 3 từ cơ bản đến nâng cao', students: 123 },
  { title: 'ReactJS + TypeScript', students: 98 },
  { title: 'NodeJS & Express', students: 76 },
  { title: 'Java Spring Boot', students: 65 }
])

const topSearched = ref([
  { title: 'ReactJS + TypeScript', searchCount: 420 },
  { title: 'Vue 3 từ cơ bản đến nâng cao', searchCount: 380 },
  { title: 'NodeJS & Express', searchCount: 290 },
  { title: 'Python cơ bản', searchCount: 240 }
])

const revenueData = ref({
  labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'],
  datasets: [
    {
      label: 'Doanh thu (VND)',
      data: [1200000, 1500000, 1800000, 1600000, 2000000, 2200000],
      backgroundColor: '#409EFF'
    }
  ]
})

const applyFilter = () => {
  alert('Filter từ ' + (dateRange.value[0] || '-') + ' đến ' + (dateRange.value[1] || '-'))
}

// Vẽ chart
onMounted(() => {
  const ctx = document.getElementById('revenueChart').getContext('2d')
  new Chart(ctx, {
    type: 'bar',
    data: revenueData.value,
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      }
    }
  })
})
</script>

<style scoped>
.manager-report {
  padding: 20px 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.report-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

.report-card {
  padding: 20px;
  border-radius: 12px;
}

.report-card h3 {
  margin-bottom: 15px;
  color: #333;
}
</style>
