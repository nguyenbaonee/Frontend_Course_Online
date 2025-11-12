<template>
  <div class="admin-layout">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="logo">Admin Panel</div>
      <el-menu
          :default-active="activeMenu"
          class="el-menu-vertical-demo"
          background-color="#409EFF"
          text-color="#fff"
          active-text-color="#ffd04b"
      >
        <el-menu-item index="dashboard" @click="go('dashboard')">
          <i class="el-icon-s-home"></i>
          <span>Dashboard</span>
        </el-menu-item>

        <el-menu-item index="manageCourses" @click="go('manageCourses')">
          <i class="el-icon-reading"></i>
          <span>Khóa học</span>
        </el-menu-item>

        <el-menu-item index="manageUsers" @click="go('manageUsers')">
          <i class="el-icon-user"></i>
          <span>Người dùng</span>
        </el-menu-item>

        <el-menu-item index="reports" @click="go('manageReport')">
          <i class="el-icon-data-analysis"></i>
          <span>Báo cáo</span>
        </el-menu-item>

        <el-menu-item index="manageSettings" @click="go('manageSetting')">
          <i class="el-icon-setting"></i>
          <span>Setting Manager</span>
        </el-menu-item>
      </el-menu>

    </aside>

    <!-- Main content -->
    <div class="main">
      <!-- Header -->
      <header class="header">
        <div class="header-left">
          <h2>{{ activeMenuTitle }}</h2>
        </div>
        <div class="header-right">
          <el-dropdown>
            <span class="el-dropdown-link">
              <el-avatar size="32" :src="admin.avatar"></el-avatar>
              {{ admin.name }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu>
              <el-dropdown-item>Profile</el-dropdown-item>
              <el-dropdown-item>Logout</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </header>

      <!-- Main router-view -->
      <main class="content">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const admin = ref({
  name: 'Nguyễn Bảo',
  avatar: 'https://i.pravatar.cc/150?img=12'
})

// Lấy route hiện tại để highlight menu
const activeMenu = ref(route.name || 'dashboard')

watch(route, () => {
  activeMenu.value = route.name
})

const activeMenuTitle = computed(() => {
  switch (activeMenu.value) {
    case 'dashboard': return 'Dashboard'
    case 'courses': return 'Quản lý khóa học'
    case 'users': return 'Quản lý người dùng'
    case 'reports': return 'Báo cáo'
    default: return 'Admin Panel'
  }
})

const go = (name) => {
  router.push({ name })
}
</script>

<style scoped>
.admin-layout {
  display: flex;
  height: 100vh;
  font-family: 'Inter', sans-serif;
}

/* Sidebar */
.sidebar {
  width: 220px;
  background-color: #409EFF;
  color: #fff;
  display: flex;
  flex-direction: column;
}

.sidebar .logo {
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  padding: 20px 0;
  color: #fff;
  border-bottom: 1px solid rgba(255,255,255,0.2);
}

/* Main */
.main {
  flex: 1;
  background: #f5f7fa;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

/* Header */
.header {
  display: flex;
  justify-content: space-between;
  padding: 20px 30px;
  background: #fff;
  border-bottom: 1px solid #ebeef5;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.header-left h2 {
  margin: 0;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 15px;
}

/* Main content slot */
.content {
  padding: 20px 30px;
  flex: 1;
}
</style>
