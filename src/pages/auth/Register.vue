<template>
  <div class="auth-wrapper">
    <el-card class="auth-card" shadow="hover">
      <div class="auth-header">
        <h2>Create Account</h2>
        <p>Join us and start learning today</p>
      </div>
      <el-form :model="form" :rules="rules" ref="formRef" class="auth-form">
        <el-form-item label="Username" prop="username">
          <el-input v-model="form.username" placeholder="Username" prefix-icon="el-icon-user" />
        </el-form-item>
        <el-form-item label="First Name" prop="firstName">
          <el-input v-model="form.firstName" placeholder="First Name" />
        </el-form-item>
        <el-form-item label="Last Name" prop="lastName">
          <el-input v-model="form.lastName" placeholder="Last Name" />
        </el-form-item>
        <el-form-item label="Email" prop="email">
          <el-input v-model="form.email" placeholder="Email" prefix-icon="el-icon-message" />
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input type="password" v-model="form.password" placeholder="Password" prefix-icon="el-icon-lock" />
        </el-form-item>
        <el-form-item label="Date of Birth" prop="dob">
          <el-date-picker v-model="form.dob" type="date" placeholder="Select date" style="width: 100%;" />
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
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const formRef = ref(null)

const form = reactive({
  username: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  dob: ''
})

// Rules validation
const rules = {
  username: [{ required: true, message: 'Username is required', trigger: 'blur' }],
  firstName: [
    { required: true, message: 'First Name is required', trigger: 'blur' },
    { pattern: /^[a-zA-ZÀ-ỹ\s]+$/, message: 'Only Vietnamese letters allowed', trigger: 'blur' }
  ],
  lastName: [
    { required: true, message: 'Last Name is required', trigger: 'blur' },
    { pattern: /^[a-zA-ZÀ-ỹ\s]+$/, message: 'Only Vietnamese letters allowed', trigger: 'blur' }
  ],
  email: [
    { required: true, message: 'Email is required', trigger: 'blur' },
    { type: 'email', message: 'Email is not valid', trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'Password is required', trigger: 'blur' },
    { min: 6, message: 'Password must be at least 6 characters', trigger: 'blur' }
  ],
  dob: [{ required: true, message: 'Date of Birth is required', trigger: 'change' }]
}

const handleRegister = () => {
  formRef.value.validate(async (valid) => {
    if (!valid) return

    try {
      const payload = { ...form }
      await axios.post('http://localhost:8082/users', payload)
      alert('Register success')
      router.push('/auth/login')
    } catch (err) {
      console.error(err)
      alert(err.response?.data?.message || 'Register failed')
    }
  })
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
