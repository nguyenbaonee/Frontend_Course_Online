<template>
  <div class="advanced-search">
    <el-form :model="form" label-position="top" @submit.native.prevent>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="6">
          <el-form-item label="Tên tác giả">
            <el-input
                v-model="form.author"
                placeholder="Nhập tên tác giả"
            />
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12" :md="6">
          <el-form-item label="Tên tác phẩm">
            <el-input
                v-model="form.title"
                placeholder="Nhập tên tác phẩm"
            />
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12" :md="6">
          <el-form-item label="Giá từ">
            <el-input-number
                v-model="form.priceFrom"
                :min="0"
                :max="10000000"
                placeholder="0"
                controls-position="right"
            />
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12" :md="6">
          <el-form-item label="Giá đến">
            <el-input-number
                v-model="form.priceTo"
                :min="0"
                :max="10000000"
                placeholder="0"
                controls-position="right"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <!-- Nút tìm kiếm & reset -->
      <div class="search-buttons">
        <el-button type="primary" @click="onSearch">Tìm kiếm</el-button>
        <el-button @click="onReset">Xóa bộ lọc</el-button>
      </div>
    </el-form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { defineEmits } from 'vue'

const emit = defineEmits(['update:search'])

const form = reactive({
  author: '',
  title: '',
  priceFrom: null,
  priceTo: null,
})

const onSearch = () => {
  emit('update:search', { ...form })
}

const onReset = () => {
  form.author = ''
  form.title = ''
  form.priceFrom = null
  form.priceTo = null
  emit('update:search', { ...form })
}
</script>

<style scoped>
.advanced-search {
  background: #ffffff;
  border-radius: 16px;
  padding: 25px 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin: 20px auto;
  max-width: 1200px;
  transition: all 0.3s ease;
}

.el-form-item__label {
  font-weight: 600;
  color: #333;
  font-size: 14px;
  margin-bottom: 6px;
}

.el-input__inner,
.el-input-number__inner {
  border-radius: 8px;
  height: 40px;
  transition: all 0.2s ease;
}

.el-input__inner:focus,
.el-input-number__inner:focus {
  border-color: #409eff;
  box-shadow: 0 0 0 2px #409eff33;
}

.search-buttons {
  margin-top: 20px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.search-buttons .el-button {
  min-width: 120px;
  border-radius: 8px;
}

/* Responsive */
@media (max-width: 992px) {
  .search-buttons {
    justify-content: flex-start;
  }
}
</style>
