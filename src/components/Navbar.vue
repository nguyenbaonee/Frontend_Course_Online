<template>
  <div class="navbar-container">
    <!-- Logo -->
    <div class="logo">
      <router-link to="/">MyCourses</router-link>
    </div>

    <!-- Menu chính -->
    <el-menu
        mode="horizontal"
        class="navbar"
        background-color="#409eff"
        text-color="#ffffff"
        active-text-color="#ffd04b"
    >
      <el-menu-item index="home">
        <router-link to="/" class="menu-link">Home</router-link>
      </el-menu-item>

      <!-- Danh mục khóa học -->
      <el-sub-menu index="categories">
        <template #title>
          <span class="menu-link">Danh mục khóa học</span>
        </template>
        <el-menu-item index="finance">
          <router-link to="/categories/finance">Tài chính kế toán</router-link>
        </el-menu-item>
        <el-menu-item index="it">
          <router-link to="/categories/it">Công nghệ thông tin</router-link>
        </el-menu-item>
        <el-menu-item index="marketing">
          <router-link to="/categories/marketing">Marketing</router-link>
        </el-menu-item>
        <el-menu-item index="photography">
          <router-link to="/categories/photography">Nhiếp ảnh</router-link>
        </el-menu-item>
        <el-menu-item index="content">
          <router-link to="/categories/content">Content creator</router-link>
        </el-menu-item>
      </el-sub-menu>

      <!-- Thảo luận -->
      <el-menu-item index="discussion">
        <router-link to="/discussion" class="menu-link">Thảo luận</router-link>
      </el-menu-item>

      <!-- Giỏ hàng và khóa học đã mua -->
      <template v-if="!user">
        <el-menu-item index="cart">
          <router-link to="/cart" class="menu-link">
            Giỏ hàng <span class="badge">{{ cartCount }}</span>
          </router-link>
        </el-menu-item>
        <el-menu-item index="purchased">
          <router-link to="/purchased" class="menu-link">Khóa học đã mua</router-link>
        </el-menu-item>
      </template>
    </el-menu>

    <!-- Search bar -->
    <div class="search-bar">
      <el-input
          placeholder="Tìm khóa học..."
          v-model="search"
          prefix-icon="el-icon-search"
          @keyup.enter="onSearch"
          size="small"
      />
    </div>

    <!-- Login / Register hoặc Avatar + Logout -->
    <div class="auth-buttons">
      <template v-if="!user">
        <el-dropdown>
          <span class="el-dropdown-link">
            <el-avatar :size="32" icon="el-icon-user"></el-avatar>
          </span>
          <el-dropdown-menu>
            <el-dropdown-item>
              <router-link to="/profile">Trang cá nhân</router-link>
            </el-dropdown-item>
            <el-dropdown-item @click="logout">Đăng xuất</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
      <template v-else>
        <el-button type="primary" size="small">
          <router-link to="/auth/login" class="auth-link">Đăng nhập</router-link>
        </el-button>
        <el-button type="success" size="small">
          <router-link to="/auth/register" class="auth-link">Đăng ký</router-link>
        </el-button>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const user = ref(null) // thay bằng store khi có auth
const cartCount = ref(3) // ví dụ số lượng giỏ hàng
const search = ref('')

const logout = () => {
  console.log('Logout clicked')
  user.value = null
}

const onSearch = () => {
  console.log('Searching for:', search.value)
}
</script>

<style scoped>
.navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #409eff;
  padding: 0 20px;
  flex-wrap: wrap;
}

/* Logo */
.logo a {
  color: #fff;
  font-weight: 700;
  font-size: 20px;
  text-decoration: none;
  margin-right: 20px;
}

/* Menu chính */
.navbar {
  flex: 1;
  min-width: 0;
}

.menu-link {
  color: #ffffff;
  font-weight: 600;
  font-size: 16px;
  text-decoration: none;
}

.el-menu-item:hover > .menu-link,
.el-sub-menu__title:hover > .menu-link {
  color: #ffd04b;
}

.el-menu-item.is-active > .menu-link,
.el-sub-menu.is-active > .menu-link {
  color: #ffd04b;
  font-weight: 700;
}

/* Badge giỏ hàng */
.badge {
  background: #ffd04b;
  color: #409eff;
  border-radius: 10px;
  padding: 0 6px;
  margin-left: 4px;
  font-size: 12px;
}

/* Search bar */
.search-bar {
  margin-left: 20px;
  min-width: 200px;
}

/* Auth buttons */
.auth-buttons {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.auth-link {
  color: white;
  text-decoration: none;
}
</style>
