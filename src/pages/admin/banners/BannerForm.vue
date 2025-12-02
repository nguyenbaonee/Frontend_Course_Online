<template>
  <div class="page-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <h3>{{ isEdit ? 'Cập nhật' : 'Thêm' }} banner</h3>
          <el-button :icon="Back" @click="handleBack">Quay lại</el-button>
        </div>
      </template>

      <el-form
          ref="formRef"
          :model="formData"
          :rules="rules"
          label-width="180px"
          label-position="left"
      >
        <!-- Banner hiện có khi Edit -->
        <el-form-item v-if="isEdit && formData.imageUrl" label="Banner hiện tại">
          <el-image
              :src="`http://localhost:8686${formData.imageUrl}`"
              fit="cover"
              style="width: 200px; height: 100px; border-radius: 4px"
          />
        </el-form-item>

        <!-- Upload mới -->
        <el-form-item label="Ảnh banner" prop="image">
          <el-upload
              v-model:file-list="newImage"
              list-type="picture-card"
              :auto-upload="false"
              :on-change="handleImageChange"
              :on-remove="handleRemoveImage"
              :before-upload="beforeImageUpload"
              :limit="1"
              :on-exceed="handleExceed"
              accept="image/jpeg,image/png,image/jpg"
          >
            <el-icon class="upload-icon"><Plus /></el-icon>
          </el-upload>
          <div class="upload-tip">JPG/PNG, tối đa 5MB</div>
        </el-form-item>

        <!-- Tiêu đề -->
        <el-form-item label="Tiêu đề" prop="title" required>
          <el-input
              v-model="formData.title"
              placeholder="Nhập tiêu đề banner"
              maxlength="150"
              show-word-limit
              clearable
          />
        </el-form-item>

        <!-- Vị trí banner -->
        <el-form-item label="Vị trí banner" prop="position" required>
          <el-select v-model="formData.position" placeholder="Chọn vị trí banner">
            <el-option
                v-for="pos in positions"
                :key="pos.value"
                :label="pos.label"
                :value="pos.value"
            />
          </el-select>
        </el-form-item>

        <!-- Submit -->
        <el-form-item>
          <el-button type="primary" :loading="submitting" @click="handleSubmit">
            {{ isEdit ? 'Cập nhật' : 'Thêm mới' }}
          </el-button>
          <el-button @click="handleReset">Làm mới</el-button>
          <el-button @click="handleBack">Hủy</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Plus, Back } from '@element-plus/icons-vue'
import axios from '../../../api/axios.js'

// Router
const router = useRouter()
const route = useRoute()
const formRef = ref()

const isEdit = ref(false)
const submitting = ref(false)
const newImage = ref([])

const positions = [
  { label: 'Menu', value: 'MENU' },
  { label: 'Middle', value: 'MIDDLE' },
  { label: 'Footer', value: 'FOOTER' },
]

// Form data
const formData = reactive({
  title: '',
  position: '',
  image: null,
  imageUrl: ''
})

const handleExceed = (files, fileList) => {
  ElMessage.warning('Chỉ được upload 1 ảnh banner')
}
// Rules
const rules = {
  title: [{ required: true, message: 'Tiêu đề không được để trống', trigger: 'blur' }],
  position: [{ required: true, message: 'Vui lòng chọn vị trí banner', trigger: 'change' }],
  image: [{ required: !isEdit.value, message: 'Vui lòng upload ảnh banner', trigger: 'change' }]
}

// Fetch banner khi edit
const fetchBanner = async () => {
  try {
    const response = await axios.get(`http://localhost:8686/banners/${route.params.id}`)
    const banner = response.data
    formData.title = banner.title
    formData.position = banner.position
    formData.imageUrl = banner.imageUrl
  } catch (error) {
    console.error(error)
    ElMessage.error('Không thể tải dữ liệu banner')
  }
}

// Validate trước upload
const beforeImageUpload = (file) => {
  const isImage = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg'
  const isLt5M = file.size / 1024 / 1024 < 5

  if (!isImage) ElMessage.error('Ảnh phải là JPG/PNG!')
  if (!isLt5M) ElMessage.error('Kích thước tối đa 5MB!')
  return isImage && isLt5M
}

// Handle upload change
const handleImageChange = (file) => {
  formData.image = file.raw
}

// Remove image
const handleRemoveImage = () => {
  formData.image = null
}

// Submit
const handleSubmit = async () => {
  if (!formRef.value) return
  await formRef.value.validate(async (valid) => {
    if (!valid) return ElMessage.error('Vui lòng kiểm tra thông tin')

    submitting.value = true
    try {
      const fd = new FormData()
      fd.append('title', formData.title.trim())
      fd.append('position', formData.position)
      if (formData.image) fd.append('image', formData.image)

      if (isEdit.value) {
        await axios.put(`http://localhost:8686/banners/${route.params.id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } })
        ElMessage.success('Cập nhật banner thành công')
      } else {
        await axios.post('http://localhost:8686/banners', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
        ElMessage.success('Thêm banner thành công')
      }
      router.push('/banners')
    } catch (error) {
      console.error(error)
      ElMessage.error('Có lỗi xảy ra')
    } finally {
      submitting.value = false
    }
  })
}

// Reset form
const handleReset = () => {
  formRef.value?.resetFields()
  newImage.value = []
  if (isEdit.value) fetchBanner()
}

// Back
const handleBack = () => router.back()

// Mounted
onMounted(() => {
  if (route.params.id) {
    isEdit.value = true
    fetchBanner()
  }
})
</script>

<style scoped lang="scss">
.page-container {
  max-width: 700px;
  margin: 0 auto;

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .upload-tip {
    margin-top: 6px;
    font-size: 12px;
    color: #888;
  }

  :deep(.el-upload--picture-card) {
    width: 150px;
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
  }

  :deep(.upload-icon) {
    font-size: 28px;
    color: #8c939d;
  }
}
</style>
