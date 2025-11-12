<template>
  <div class="manager-user">
    <!-- Header action -->
    <div class="user-header">
      <el-input
          v-model="search"
          placeholder="Tìm kiếm người dùng..."
          clearable
          prefix-icon="el-icon-search"
          class="search-input"
      ></el-input>
      <el-button type="primary" icon="el-icon-plus" @click="openAddModal">Thêm người dùng</el-button>
    </div>

    <!-- Users Table -->
    <el-table :data="filteredUsers" style="width: 100%" stripe>
      <el-table-column prop="id" label="ID" width="60"/>
      <el-table-column prop="name" label="Họ và tên"/>
      <el-table-column prop="email" label="Email"/>
      <el-table-column prop="role" label="Vai trò"/>
      <el-table-column prop="status" label="Trạng thái"/>
      <el-table-column label="Hành động" width="180">
        <template #default="scope">
          <el-button type="primary" size="mini" @click="editUser(scope.row)">Sửa</el-button>
          <el-button type="danger" size="mini" @click="deleteUser(scope.row)">Xóa</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- Modal Add/Edit -->
    <el-dialog :title="modalTitle" :visible.sync="showModal">
      <el-form :model="form" label-width="100px">
        <el-form-item label="Họ và tên">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="Email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="Vai trò">
          <el-select v-model="form.role" placeholder="Chọn vai trò">
            <el-option label="Admin" value="Admin"></el-option>
            <el-option label="User" value="User"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Trạng thái">
          <el-select v-model="form.status" placeholder="Chọn trạng thái">
            <el-option label="Kích hoạt" value="active"></el-option>
            <el-option label="Chưa kích hoạt" value="inactive"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showModal = false">Hủy</el-button>
        <el-button type="primary" @click="saveUser">Lưu</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const search = ref('')
const showModal = ref(false)
const modalTitle = ref('')

const users = ref([
  { id: 1, name: 'Nguyễn Bảo', email: 'bao@gmail.com', role: 'Admin', status: 'active' },
  { id: 2, name: 'Lê Minh Tùng', email: 'tung@gmail.com', role: 'User', status: 'active' },
  { id: 3, name: 'Phạm Duy An', email: 'an@gmail.com', role: 'User', status: 'inactive' }
])

const form = ref({
  id: null,
  name: '',
  email: '',
  role: 'User',
  status: 'active'
})

const filteredUsers = computed(() => {
  if (!search.value) return users.value
  return users.value.filter(u =>
      u.name.toLowerCase().includes(search.value.toLowerCase()) ||
      u.email.toLowerCase().includes(search.value.toLowerCase())
  )
})

const openAddModal = () => {
  modalTitle.value = 'Thêm người dùng'
  form.value = { id: null, name: '', email: '', role: 'User', status: 'active' }
  showModal.value = true
}

const editUser = (user) => {
  modalTitle.value = 'Sửa người dùng'
  form.value = { ...user }
  showModal.value = true
}

const saveUser = () => {
  if (form.value.id) {
    // Edit
    const index = users.value.findIndex(u => u.id === form.value.id)
    if (index !== -1) users.value[index] = { ...form.value }
  } else {
    // Add
    form.value.id = users.value.length + 1
    users.value.push({ ...form.value })
  }
  showModal.value = false
}

const deleteUser = (user) => {
  users.value = users.value.filter(u => u.id !== user.id)
}
</script>

<style scoped>
.manager-user {
  padding: 20px 30px;
}

.user-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.search-input {
  width: 300px;
}
</style>
