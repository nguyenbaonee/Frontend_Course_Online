<template>
  <div class="auth-wrapper">
    <el-card class="auth-card" shadow="hover">
      <div class="auth-header">
        <h2>Welcome Back</h2>
        <p>Please login to your account</p>
      </div>
      <el-form :model="form" @submit.prevent="handleLogin" class="auth-form">
        <el-form-item label="Username">
          <el-input v-model="form.username" placeholder="Username" prefix-icon="el-icon-user" />
        </el-form-item>
        <el-form-item label="Password">
          <el-input type="password" v-model="form.password" placeholder="Password" prefix-icon="el-icon-lock" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLogin" class="login-btn" :round="true">Login</el-button>
        </el-form-item>
      </el-form>
      <div class="links">
        <router-link to="/auth/register">Register</router-link> |
        <router-link to="/auth/forgot-password">Forgot Password?</router-link>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const form = reactive({ username: '', password: '' })
const router = useRouter()

const handleLogin = async () => {
  if (!form.username || !form.password) {
    alert('Vui lòng nhập Tên người dùng và Mật khẩu')
    return
  }

  try {
    const res = await axios.post('http://localhost:8092/api/v1/iam/auth/login', {
      username: form.username,
      password: form.password
    })

    const token = res.data.result.token
    const refreshToken = res.data.result.refreshToken

    // lưu token
    localStorage.setItem('accessToken', token)
    localStorage.setItem('refreshToken', refreshToken)

    const parseJwt = (token) => {
      const base64Url = token.split('.')[1]
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      return JSON.parse(atob(base64))
    }

    const payload = parseJwt(token)
    const role = payload.scope // hoặc payload.roles tùy BE
    if (payload) {
      localStorage.setItem('userId', payload.userId)
      localStorage.setItem('username', payload.sub)
      localStorage.setItem('role', payload.scope)
    }

    if (role === 'ROLE_ADMIN') {
      await router.push('/dashboard')
    } else {
      await router.push('/')
    }
  } catch (err) {
    console.error(err)
    alert(err.response?.data?.message || 'Login failed')
  }
}

</script>
<style scoped>
/* Wrapper full screen, gradient background */
.auth-wrapper {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea, #764ba2);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Card style */
.auth-card {
  width: 400px;
  padding: 30px 25px;
  border-radius: 12px;
  box-shadow: 0 15px 30px rgba(0,0,0,0.1);
  background-color: #fff;
  text-align: center;
}

/* Header */
.auth-header h2 {
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
  color: #333;
}
.auth-header p {
  margin-top: 5px;
  color: #666;
  font-size: 0.95rem;
}

/* Form inputs */
.auth-form ::v-deep(.el-input__inner) {
  border-radius: 8px;
  padding: 10px 15px;
  transition: all 0.3s ease;
}
.auth-form ::v-deep(.el-input__inner:focus) {
  border-color: #667eea;
  box-shadow: 0 0 5px rgba(102, 126, 234, 0.5);
}

/* Login button */
.login-btn {
  width: 100%;
  padding: 12px 0;
  font-size: 1rem;
  transition: all 0.3s;
}
.login-btn:hover {
  background-color: #5a67d8;
}

/* Links */
.links {
  margin-top: 15px;
  font-size: 0.9rem;
}
.links a {
  color: #667eea;
  text-decoration: none;
  transition: 0.3s;
}
.links a:hover {
  text-decoration: underline;
}
</style>
