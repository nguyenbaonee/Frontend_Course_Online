<template>
  <div class="auth-wrapper">
    <el-card class="auth-card" shadow="hover">
      <div class="auth-header">
        <h2>Create Account</h2>
        <p>Join us and start learning today</p>
      </div>
      <el-form :model="form" @submit.prevent="handleRegister" class="auth-form">
        <el-form-item label="Name">
          <el-input v-model="form.name" placeholder="Name" prefix-icon="el-icon-user" />
        </el-form-item>
        <el-form-item label="Email">
          <el-input v-model="form.email" placeholder="Email" prefix-icon="el-icon-message" />
        </el-form-item>
        <el-form-item label="Password">
          <el-input type="password" v-model="form.password" placeholder="Password" prefix-icon="el-icon-lock" />
        </el-form-item>
        <el-form-item>
          <el-button type="success" class="register-btn" :round="true" @click="handleRegister">
            Register
          </el-button>
        </el-form-item>
      </el-form>
      <div class="links">
        Already have an account? <router-link to="/auth/login">Login</router-link>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const form = reactive({ name: '', email: '', password: '' })
const router = useRouter()

const handleRegister = () => {
  alert(`Registered: ${form.name} - ${form.email}`)
  router.push('/auth/login')
}
</script>

<style scoped>
/* Full screen gradient */
.auth-wrapper {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea, #764ba2);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Card */
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

/* Inputs */
.auth-form ::v-deep(.el-input__inner) {
  border-radius: 8px;
  padding: 10px 15px;
  transition: all 0.3s ease;
}
.auth-form ::v-deep(.el-input__inner:focus) {
  border-color: #667eea;
  box-shadow: 0 0 5px rgba(102, 126, 234, 0.5);
}

/* Register button */
.register-btn {
  width: 100%;
  padding: 12px 0;
  font-size: 1rem;
  transition: all 0.3s;
}
.register-btn:hover {
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
