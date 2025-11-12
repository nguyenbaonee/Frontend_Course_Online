<template>
  <div class="admin-setting">
    <el-card class="setting-card">
      <h3>Thông tin tài khoản</h3>
      <el-form :model="adminInfo" label-width="120px">
        <el-form-item label="Tên">
          <el-input v-model="adminInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="Email">
          <el-input v-model="adminInfo.email"></el-input>
        </el-form-item>
        <el-form-item label="Avatar">
          <el-upload
              class="avatar-uploader"
              action=""
              :show-file-list="false"
              :on-change="handleAvatarChange"
          >
            <img v-if="adminInfo.avatar" :src="adminInfo.avatar" class="avatar"/>
            <i v-else class="el-icon-plus avatar-placeholder"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="saveInfo">Lưu thay đổi</el-button>
    </el-card>

    <el-card class="setting-card">
      <h3>Đổi mật khẩu</h3>
      <el-form :model="passwordForm" label-width="120px">
        <el-form-item label="Mật khẩu cũ">
          <el-input v-model="passwordForm.oldPassword" type="password"></el-input>
        </el-form-item>
        <el-form-item label="Mật khẩu mới">
          <el-input v-model="passwordForm.newPassword" type="password"></el-input>
        </el-form-item>
        <el-form-item label="Xác nhận mật khẩu">
          <el-input v-model="passwordForm.confirmPassword" type="password"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="changePassword">Đổi mật khẩu</el-button>
    </el-card>

    <el-card class="setting-card">
      <h3>Cài đặt chung</h3>
      <el-form label-width="180px">
        <el-form-item label="Thông báo email">
          <el-switch v-model="settings.emailNotification"></el-switch>
        </el-form-item>
        <el-form-item label="Trạng thái hoạt động">
          <el-switch v-model="settings.active"></el-switch>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="saveSettings">Lưu cài đặt</el-button>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const adminInfo = ref({
  name: 'Nguyễn Bảo',
  email: 'bao@gmail.com',
  avatar: 'https://i.pravatar.cc/150?img=12'
})

const passwordForm = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const settings = ref({
  emailNotification: true,
  active: true
})

const handleAvatarChange = (file, fileList) => {
  // Demo: chỉ lấy URL tạm
  const reader = new FileReader()
  reader.onload = e => {
    adminInfo.value.avatar = e.target.result
  }
  reader.readAsDataURL(file.raw)
}

const saveInfo = () => {
  console.log('Lưu thông tin:', adminInfo.value)
  alert('Đã lưu thông tin!')
}

const changePassword = () => {
  if(passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    alert('Mật khẩu xác nhận không khớp!')
    return
  }
  console.log('Đổi mật khẩu:', passwordForm.value)
  alert('Đã đổi mật khẩu!')
  passwordForm.value = { oldPassword: '', newPassword: '', confirmPassword: '' }
}

const saveSettings = () => {
  console.log('Lưu cài đặt:', settings.value)
  alert('Đã lưu cài đặt!')
}
</script>

<style scoped>
.admin-setting {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 30px;
}

.setting-card {
  padding: 20px;
  border-radius: 12px;
}

.setting-card h3 {
  margin-bottom: 15px;
  color: #333;
}

.avatar-uploader {
  display: inline-block;
  width: 100px;
  height: 100px;
  cursor: pointer;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
}

.avatar-placeholder {
  font-size: 48px;
  color: #bbb;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  border: 2px dashed #ccc;
  border-radius: 50%;
}
</style>
