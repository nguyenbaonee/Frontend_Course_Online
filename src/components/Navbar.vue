<template>
  <el-header class="navbar" :height="navbarHeight">
    <div class="navbar-container">
      <!-- Logo -->
      <div class="navbar-left">
        <router-link to="/" class="logo">
          <div class="logo-icon">
            <el-icon :size="24"><Reading /></el-icon>
          </div>
          <span class="logo-text">EduNovel</span>
        </router-link>

        <el-menu
            :default-active="activeIndex"
            class="nav-menu"
            mode="horizontal"
            :ellipsis="false"
            @select="handleSelect"
        >
          <el-menu-item index="/">Trang chủ</el-menu-item>
          <el-menu-item index="/courses">Khóa học</el-menu-item>
          <el-menu-item index="/instructors">Giảng viên</el-menu-item>
          <el-menu-item index="/blog">Blog</el-menu-item>
        </el-menu>
      </div>

      <!-- Right Side -->
      <div class="navbar-right">
        <!-- Search -->
        <el-input
            v-model="searchQuery"
            class="search-input"
            placeholder="Tìm kiếm khóa học..."
            :prefix-icon="Search"
            clearable
            @keyup.enter="handleSearch"
        />

        <!-- Cart -->
        <!-- Cart -->
        <el-badge v-if="isAuthenticated" :value="cartCount" :hidden="cartCount === 0" class="navbar-badge">
          <el-button circle @click="handleCart">
            <el-icon><ShoppingCart /></el-icon>
          </el-button>
        </el-badge>

        <!-- Notification -->
        <el-badge v-if="isAuthenticated" :value="notificationCount" :hidden="notificationCount === 0" class="navbar-badge">
          <el-button circle @click="handleNotification">
            <el-icon><Bell /></el-icon>
          </el-button>
        </el-badge>


        <!-- User Menu / Auth Buttons -->
        <div v-if="isAuthenticated" class="user-section">
          <el-dropdown trigger="click" @command="handleCommand">
            <div class="user-info">
              <el-avatar :src="user.avatar" :size="40">
                {{ userName }}
              </el-avatar>
              <span class="user-name">{{ user.name }}</span>
              <el-icon class="arrow-icon"><ArrowDown /></el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="profile">
                  <el-icon><User /></el-icon>
                  <span>Tài khoản của tôi</span>
                </el-dropdown-item>
                <el-dropdown-item command="my-courses">
                  <el-icon><Reading /></el-icon>
                  <span>Khóa học của tôi</span>
                </el-dropdown-item>
                <el-dropdown-item command="wishlist">
                  <el-icon><Star /></el-icon>
                  <span>Danh sách yêu thích</span>
                </el-dropdown-item>
                <el-dropdown-item command="settings">
                  <el-icon><Setting /></el-icon>
                  <span>Cài đặt</span>
                </el-dropdown-item>
                <el-dropdown-item divided command="logout">
                  <el-icon><SwitchButton /></el-icon>
                  <span>Đăng xuất</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>

        <el-space v-else :size="12" class="auth-buttons">
          <el-button @click="handleLogin">Đăng nhập</el-button>
          <el-button type="primary" @click="handleRegister">Đăng ký</el-button>
        </el-space>

        <!-- Mobile Menu Toggle -->
        <el-button
            class="mobile-menu-btn"
            circle
            @click="drawer = true"
        >
          <el-icon><Menu /></el-icon>
        </el-button>
      </div>
    </div>
  </el-header>

  <!-- Mobile Drawer -->
  <el-drawer
      v-model="drawer"
      title="Menu"
      direction="rtl"
      size="80%"
  >
    <!-- Mobile Search -->
    <el-input
        v-model="searchQuery"
        placeholder="Tìm kiếm khóa học..."
        :prefix-icon="Search"
        clearable
        style="margin-bottom: 20px"
        @keyup.enter="handleSearch"
    />

    <!-- Mobile Navigation -->
    <el-menu
        :default-active="activeIndex"
        @select="handleMobileSelect"
    >
      <el-menu-item index="/">
        <el-icon><HomeFilled /></el-icon>
        <span>Trang chủ</span>
      </el-menu-item>
      <el-menu-item index="/courses">
        <el-icon><Reading /></el-icon>
        <span>Khóa học</span>
      </el-menu-item>
      <el-menu-item index="/instructors">
        <el-icon><UserFilled /></el-icon>
        <span>Giảng viên</span>
      </el-menu-item>
      <el-menu-item index="/blog">
        <el-icon><Document /></el-icon>
        <span>Blog</span>
      </el-menu-item>
    </el-menu>

    <el-divider />

    <!-- Mobile User Section -->
    <div v-if="isAuthenticated" class="mobile-user-section">
      <el-card shadow="never" :body-style="{ padding: '16px' }">
        <div class="mobile-user-info">
          <el-avatar :src="image.avatar" :size="60">
            {{ user.name.charAt(0) }}
          </el-avatar>
          <div class="mobile-user-details">
            <div class="mobile-user-name">{{ user.name }}</div>
            <div class="mobile-user-email">{{ user.email }}</div>
          </div>
        </div>
      </el-card>

      <el-menu style="margin-top: 16px" @select="handleMobileCommand">
        <el-menu-item index="profile">
          <el-icon><User /></el-icon>
          <span>Tài khoản của tôi</span>
        </el-menu-item>
        <el-menu-item index="my-courses">
          <el-icon><Reading /></el-icon>
          <span>Khóa học của tôi</span>
        </el-menu-item>
        <el-menu-item index="wishlist">
          <el-icon><Star /></el-icon>
          <span>Danh sách yêu thích</span>
        </el-menu-item>
        <el-menu-item index="settings">
          <el-icon><Setting /></el-icon>
          <span>Cài đặt</span>
        </el-menu-item>
        <el-menu-item index="logout">
          <el-icon><SwitchButton /></el-icon>
          <span>Đăng xuất</span>
        </el-menu-item>
      </el-menu>
    </div>

    <!-- Mobile Auth Buttons -->
    <el-space v-else direction="vertical" :fill="true" style="width: 100%; margin-top: 20px">
      <el-button size="large" style="width: 100%" @click="handleLogin">
        Đăng nhập
      </el-button>
      <el-button type="primary" size="large" style="width: 100%" @click="handleRegister">
        Đăng ký
      </el-button>
    </el-space>
  </el-drawer>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import {
  Search, ShoppingCart, Bell, User, Reading,
  Star, Setting, SwitchButton, ArrowDown,
  Menu, HomeFilled, UserFilled, Document
} from '@element-plus/icons-vue'
import image from "../assets/images/images.js";

const router = useRouter()
const route = useRoute()

// Navbar state
const searchQuery = ref('')
const drawer = ref(false)
const navbarHeight = '64px'
const cartCount = ref(3)
const notificationCount = ref(5)
const activeIndex = computed(() => route.path)

const user = ref({
  id: null,
  name: '',
  email: '',
})

// Check if user is authenticated
const isAuthenticated = computed(() => !!localStorage.getItem('accessToken'))

// Fetch user info from API
const fetchMyInfo = async () => {
  const token = localStorage.getItem('accessToken')
  if (!token) return

  try {
    const { data } = await axios.get('http://localhost:8092/iam-service/users/my-info', {
      headers: { Authorization: `Bearer ${token}` }
    })

    user.value = {
      id: data.id,
      name: data.username,
      email: data.email || '',
      avatar: '' // default avatar
    }
  } catch (err) {
    console.error('Failed to fetch user info', err)
    handleLogout()
  }
}

// Fetch user info on mounted if logged in
onMounted(() => {
  if (isAuthenticated.value) {
    fetchMyInfo()
  }
})

// Navbar actions
const handleSelect = (index) => router.push(index)
const handleMobileSelect = (index) => { router.push(index); drawer.value = false }
const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ name: 'search', query: { q: searchQuery.value } })
    drawer.value = false
  }
}
const handleCart = () => router.push('/cart')
const handleNotification = () => router.push('/notifications')
const handleLogin = () => { router.push('/auth/login'); drawer.value = false }
const handleRegister = () => { router.push('/auth/register'); drawer.value = false }

const executeCommand = (command) => {
  switch (command) {
    case 'profile': router.push('/profile'); break
    case 'my-courses': router.push('/purchased'); break
    case 'wishlist': router.push('/wishlist'); break
    case 'settings': router.push('/settings'); break
    case 'logout': handleLogout(); break
  }
}

const handleCommand = (command) => executeCommand(command)
const handleMobileCommand = (command) => { drawer.value = false; executeCommand(command) }

// Logout
const handleLogout = async () => {
  try {
    const token = localStorage.getItem('accessToken')
    if (token) {
      await axios.post('http://localhost:8092/iam-service/auth/logout', {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
    }
  } catch (err) {
    console.error(err)
  } finally {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    router.push('/auth/login')
  }
}
</script>

<style scoped lang="scss">
.navbar {
  background: #f9f9ff; // màu sáng hơn, dịu mắt
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12); // shadow mềm hơn
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: none;
  height: 80px; // tăng chiều cao navbar
}

.navbar-container {
  max-width: 1400px; // rộng hơn
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px; // padding rộng ra
}

.navbar-left {
  display: flex;
  align-items: center;
  gap: 50px; // rộng ra hơn
  flex: 1;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: inherit;
  flex-shrink: 0;

  .logo-icon {
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 22px;
  }

  .logo-text {
    font-size: 22px;
    font-weight: 800;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
}

.nav-menu {
  border-bottom: none;

  @media (max-width: 968px) {
    display: none;
  }

  :deep(.el-menu-item) {
    font-weight: 600;
    font-size: 16px;
    color: #555;

    &.is-active {
      color: #667eea;
      border-bottom: 2px solid #667eea;
    }

    &:hover {
      color: #764ba2;
      background: linear-gradient(90deg, rgba(102,126,234,0.1), rgba(118,75,162,0.1));
      border-radius: 8px;
    }
  }
}

.navbar-right {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
}

.search-input {
  width: 300px;

  @media (max-width: 1200px) {
    width: 220px;
  }

  @media (max-width: 968px) {
    display: none;
  }
}

.navbar-badge {
  @media (max-width: 768px) {
    display: none;
  }
}

.user-section {
  @media (max-width: 768px) {
    display: none;
  }
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 12px;
  transition: all 0.3s;

  &:hover {
    background: linear-gradient(90deg, rgba(102,126,234,0.15), rgba(118,75,162,0.15));
  }

  .user-name {
    font-weight: 600;
    color: #333;

    @media (max-width: 1200px) {
      display: none;
    }
  }

  .arrow-icon {
    color: #888;
  }
}

.auth-buttons {
  @media (max-width: 768px) {
    display: none;
  }

  .el-button {
    font-weight: 600;
  }
}

.mobile-menu-btn {
  display: none;

  @media (max-width: 968px) {
    display: inline-flex;
  }
}

// Mobile Drawer Styles
.mobile-user-section {
  padding: 0;
}

.mobile-user-info {
  display: flex;
  align-items: center;
  gap: 18px;
}

.mobile-user-details {
  flex: 1;
}

.mobile-user-name {
  font-size: 18px;
  font-weight: 700;
  color: #333;
  margin-bottom: 4px;
}

.mobile-user-email {
  font-size: 14px;
  color: #666;
}

// Dropdown Menu Styles
:deep(.el-dropdown-menu__item) {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 24px;
  font-weight: 500;
  font-size: 15px;
  border-radius: 8px;
  transition: background 0.2s;

  &:hover {
    background: linear-gradient(90deg, rgba(102,126,234,0.1), rgba(118,75,162,0.1));
  }

  .el-icon {
    font-size: 18px;
  }
}
</style>
