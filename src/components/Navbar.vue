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

        <!-- Desktop Navigation -->
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
        <el-badge :value="cartCount" :hidden="cartCount === 0" class="navbar-badge">
          <el-button circle @click="handleCart">
            <el-icon><ShoppingCart /></el-icon>
          </el-button>
        </el-badge>

        <!-- Notification -->
        <el-badge :value="notificationCount" :hidden="notificationCount === 0" class="navbar-badge">
          <el-button circle @click="handleNotification">
            <el-icon><Bell /></el-icon>
          </el-button>
        </el-badge>

        <!-- User Menu / Auth Buttons -->
        <div v-if="isAuthenticated" class="user-section">
          <el-dropdown trigger="click" @command="handleCommand">
            <div class="user-info">
              <el-avatar :src="user.avatar" :size="40">
                {{ user.name.charAt(0) }}
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
          <el-avatar :src="user.avatar" :size="60">
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
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import {
  Search,
  ShoppingCart,
  Bell,
  User,
  Reading,
  Star,
  Setting,
  SwitchButton,
  ArrowDown,
  Menu,
  HomeFilled,
  UserFilled,
  Document
} from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()

// State
const searchQuery = ref('')
const drawer = ref(false)
const navbarHeight = '64px'
const cartCount = ref(3)
const notificationCount = ref(5)

// Active menu index
const activeIndex = computed(() => route.path)

// Mock user data - thay bằng store/composable thực tế
const isAuthenticated = ref(true) // Đổi thành false để test trạng thái chưa đăng nhập
const user = ref({
  name: 'Nguyễn Văn A',
  email: 'nguyenvana@email.com',
  avatar: 'https://i.pravatar.cc/150?img=12'
})

// Methods
const handleSelect = (index) => {
  router.push(index)
}

const handleMobileSelect = (index) => {
  router.push(index)
  drawer.value = false
}

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ name: 'search', query: { q: searchQuery.value } })
    drawer.value = false
  }
}

const handleCart = () => {
  router.push('/cart')
}

const handleNotification = () => {
  router.push('/notifications')
}

const handleLogin = () => {
  router.push('/auth/login')
  drawer.value = false
}

const handleRegister = () => {
  router.push('/auth/register')
  drawer.value = false
}

const handleCommand = (command) => {
  executeCommand(command)
}

const handleMobileCommand = (command) => {
  drawer.value = false
  executeCommand(command)
}

const executeCommand = (command) => {
  switch (command) {
    case 'profile':
      router.push('/profile')
      break
    case 'my-courses':
      router.push('/purchased')
      break
    case 'wishlist':
      router.push('/wishlist')
      break
    case 'settings':
      router.push('/settings')
      break
    case 'logout':
      handleLogout()
      break
  }
}

const handleLogout = () => {
  ElMessage.success('Đăng xuất thành công')
  // Thực hiện logout logic
  isAuthenticated.value = false
  router.push('/')
}
</script>

<style scoped lang="scss">
.navbar {
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: none;
}

.navbar-container {
  max-width: 1280px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
}

.navbar-left {
  display: flex;
  align-items: center;
  gap: 40px;
  flex: 1;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: inherit;
  flex-shrink: 0;

  .logo-icon {
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
  }

  .logo-text {
    font-size: 20px;
    font-weight: 700;
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
    font-weight: 500;

    &.is-active {
      color: #667eea;
      border-bottom-color: #667eea;
    }

    &:hover {
      color: #667eea;
      background-color: transparent;
    }
  }
}

.navbar-right {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.search-input {
  width: 280px;

  @media (max-width: 1200px) {
    width: 200px;
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
  gap: 8px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 8px;
  transition: all 0.3s;

  &:hover {
    background-color: var(--el-fill-color-light);
  }

  .user-name {
    font-weight: 500;
    color: var(--el-text-color-primary);

    @media (max-width: 1200px) {
      display: none;
    }
  }

  .arrow-icon {
    color: var(--el-text-color-secondary);
  }
}

.auth-buttons {
  @media (max-width: 768px) {
    display: none;
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
  gap: 16px;
}

.mobile-user-details {
  flex: 1;
}

.mobile-user-name {
  font-size: 16px;
  font-weight: 600;
  color: var(--el-text-color-primary);
  margin-bottom: 4px;
}

.mobile-user-email {
  font-size: 14px;
  color: var(--el-text-color-secondary);
}

// Dropdown Menu Styles
:deep(.el-dropdown-menu__item) {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;

  .el-icon {
    font-size: 16px;
  }
}
</style>