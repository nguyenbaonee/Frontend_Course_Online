<template>
  <div class="manager-course">
    <!-- Header action -->
    <div class="course-header">
      <el-input
          v-model="search"
          placeholder="Tìm kiếm khóa học..."
          clearable
          prefix-icon="el-icon-search"
          class="search-input"
      ></el-input>
      <el-button type="primary" icon="el-icon-plus" @click="openAddModal">Thêm khóa học</el-button>
    </div>

    <!-- Courses Table -->
    <el-table :data="filteredCourses" style="width: 100%" stripe>
      <el-table-column prop="id" label="ID" width="60"/>
      <el-table-column prop="title" label="Tiêu đề"/>
      <el-table-column prop="author" label="Giảng viên"/>
      <el-table-column prop="price" label="Giá"/>
      <el-table-column prop="students" label="Học viên"/>
      <el-table-column label="Hành động" width="180">
        <template #default="scope">
          <el-button type="primary" size="mini" @click="editCourse(scope.row)">Sửa</el-button>
          <el-button type="danger" size="mini" @click="deleteCourse(scope.row)">Xóa</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- Modal Add/Edit -->
    <el-dialog :title="modalTitle" :visible.sync="showModal">
      <el-form :model="form" label-width="100px">
        <el-form-item label="Tiêu đề">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="Giảng viên">
          <el-input v-model="form.author"></el-input>
        </el-form-item>
        <el-form-item label="Giá">
          <el-input v-model="form.price" placeholder="Ví dụ: 599000"></el-input>
        </el-form-item>
        <el-form-item label="Học viên">
          <el-input v-model="form.students"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showModal = false">Hủy</el-button>
        <el-button type="primary" @click="saveCourse">Lưu</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const search = ref('')
const showModal = ref(false)
const modalTitle = ref('')

const courses = ref([
  { id: 1, title: 'Vue 3 từ cơ bản đến nâng cao', author: 'Nguyễn Bảo', price: 599000, students: 123 },
  { id: 2, title: 'ReactJS + TypeScript', author: 'Lê Minh Tùng', price: 799000, students: 243 },
  { id: 3, title: 'NodeJS & Express', author: 'Phạm Duy An', price: 499000, students: 98 }
])

const form = ref({
  id: null,
  title: '',
  author: '',
  price: '',
  students: ''
})

const filteredCourses = computed(() => {
  if (!search.value) return courses.value
  return courses.value.filter(c => c.title.toLowerCase().includes(search.value.toLowerCase()))
})

const openAddModal = () => {
  modalTitle.value = 'Thêm khóa học'
  form.value = { id: null, title: '', author: '', price: '', students: '' }
  showModal.value = true
}

const editCourse = (course) => {
  modalTitle.value = 'Sửa khóa học'
  form.value = { ...course }
  showModal.value = true
}

const saveCourse = () => {
  if (form.value.id) {
    // Edit
    const index = courses.value.findIndex(c => c.id === form.value.id)
    if (index !== -1) courses.value[index] = { ...form.value }
  } else {
    // Add
    form.value.id = courses.value.length + 1
    courses.value.push({ ...form.value })
  }
  showModal.value = false
}

const deleteCourse = (course) => {
  courses.value = courses.value.filter(c => c.id !== course.id)
}
</script>

<style scoped>
.manager-course {
  padding: 20px 30px;
}

.course-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.search-input {
  width: 300px;
}

.stat-card, .el-table {
  font-family: 'Inter', sans-serif;
}
</style>
