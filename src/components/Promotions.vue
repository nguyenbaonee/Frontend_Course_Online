<template>
  <div class="sidebar-promotions">
    <div v-if="banners.length > 0" class="promotion-list">
      <div v-for="banner in banners" :key="banner.id" class="promotion-item">
        <img :src="`http://localhost:8686${banner.imageUrl}`" alt="Banner" class="promotion-image" />
        <p class="promotion-description">{{ banner.description || 'EDuNovel - học mọi lúc mọi nơi.'}}</p>
      </div>
    </div>
    <div v-else class="no-promotions">
      <p>Không có khuyến mãi nào hiển thị.</p>
    </div>

    <div class="promotion-alert">
      <p>Khuyến mãi hấp dẫn!</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const banners = ref([])

const fetchBanners = async () => {
  try {
    const res = await axios.get('http://localhost:8686/banners', {
      params: { position: 'MIDDLE', status: 'ACTIVE' }
    })
    banners.value = res.data
  } catch (err) {
    console.error('Error fetching banners:', err)
  }
}

onMounted(() => {
  fetchBanners()
})
</script>

<style scoped>
.sidebar-promotions {
  width: 300px;
  padding: 20px;
  background-color: #f4f4f4;
  border-right: 1px solid #ccc;
}

.promotion-list {
  display: flex;
  flex-direction: column;
}

.promotion-item {
  margin-bottom: 20px;
  text-align: center;
}

.promotion-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.promotion-description {
  margin-top: 10px;
  font-size: 14px;
  color: #555;
}

.no-promotions {
  text-align: center;
  color: #999;
  font-style: italic;
}

.promotion-alert {
  margin-top: 20px;
  padding: 12px;
  background-color: #d1f7d1; /* Màu nền xanh nhẹ */
  color: #4caf50; /* Màu chữ xanh */
  text-align: center;
  font-weight: bold;
  border-radius: 8px; /* Bo tròn góc */
  animation: blink 2s ease-in-out infinite, colorChange 4s ease-in-out infinite;
}

/* Hiệu ứng nháy nhẹ */
@keyframes blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* Hiệu ứng chuyển màu từ từ */
@keyframes colorChange {
  0% {
    background-color: #d1f7d1; /* Xanh nhạt ban đầu */
    color: #4caf50; /* Màu xanh */
  }
  50% {
    background-color: #b2f7b2; /* Màu xanh nhạt khác */
    color: #388e3c; /* Xanh đậm hơn */
  }
  100% {
    background-color: #d1f7d1;
    color: #4caf50;
  }
}
</style>

