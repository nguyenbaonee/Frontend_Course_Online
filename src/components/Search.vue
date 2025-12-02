<template>
  <div class="advanced-search-wrapper">
    <el-form :model="form" label-position="top" @submit.prevent class="advanced-search-form">
      <el-row :gutter="20" justify="center" align="middle">
        <el-col :xs="24" :sm="12" :md="6">
          <el-form-item label="Tên giảng viên">
            <el-input v-model="form.author" placeholder="Nhập tên giảng viên..." />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="6">
          <el-form-item label="Tên khóa học">
            <el-input v-model="form.title" placeholder="Nhập khóa học..." />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="6">
          <div class="search-buttons">
            <el-button type="primary" @click="onSearch">Tìm kiếm</el-button>
            <el-button @click="onReset">Xóa bộ lọc</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const form = reactive({
  author: '',
  title: ''
})

const onSearch = () => {
  router.push({ name: 'search', query: { author: form.author || undefined, name: form.title || undefined }})
}

const onReset = () => {
  form.author = ''
  form.title = ''
  router.push({ name: 'search' }) // reset route
}
</script>

<style scoped>
.advanced-search-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  padding: 20px;
}
.advanced-search-form {
  background: #fff;
  padding: 25px 30px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  width: 100%;
  max-width: 1200px;
}
.search-buttons {
  display: flex;
  gap: 10px;
}
</style>
