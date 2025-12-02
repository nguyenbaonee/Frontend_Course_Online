<template>
  <div class="page-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <h3>Chi tiết Banner</h3>
          <el-button type="primary" @click="handleBack">Quay lại</el-button>
        </div>
      </template>

      <el-row :gutter="20">
        <!-- Hình ảnh banner -->
        <el-col :span="6">
          <el-image
              :src="`http://localhost:8686${banner.imageUrl}`"
              style="width: 150px; height: 100px; border-radius: 8px;"
              fit="cover"
          />
        </el-col>

        <!-- Thông tin -->
        <el-col :span="18">
          <el-descriptions column="1" border>
            <el-descriptions-item label="Tiêu đề">
              {{ banner.title }}
            </el-descriptions-item>

            <el-descriptions-item label="Vị trí">
              {{ banner.position }}
            </el-descriptions-item>

            <el-descriptions-item label="Trạng thái">
              <el-tag :type="banner.status === 'ACTIVE' ? 'success' : 'danger'">
                {{ banner.status === 'ACTIVE' ? 'Hoạt động' : 'Ngừng hoạt động' }}
              </el-tag>
            </el-descriptions-item>

            <el-descriptions-item label="Ngày tạo">
              {{ formatDate(banner.createdAt) }}
            </el-descriptions-item>

            <el-descriptions-item label="Ngày cập nhật">
              {{ formatDate(banner.updatedAt) }}
            </el-descriptions-item>
          </el-descriptions>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import axios from 'axios'

const router = useRouter()
const route = useRoute()

// data model banner
const banner = ref({
  id: '',
  title: '',
  imageUrl: '',
  status: '',
  position: '',
  createdAt: '',
  updatedAt: ''
})

// format ngày
const formatDate = (instant) => {
  if (!instant) return ''
  const date = new Date(instant)
  return date.toLocaleString()
}

// fetch banner detail
const fetchBanner = async () => {
  try {
    const id = route.params.id
    const res = await axios.get(`http://localhost:8686/banners/${id}`)
    banner.value = res.data
  } catch (err) {
    const msg = err.response?.data?.message || 'Lỗi khi lấy thông tin banner'
    ElMessage.error(msg)
    router.back()
  }
}

const handleBack = () => {
  router.back()
}

onMounted(() => {
  fetchBanner()
})
</script>

<style scoped>
.page-container {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
