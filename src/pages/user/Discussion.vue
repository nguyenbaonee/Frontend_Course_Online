<template>
  <div class="discussion-page">
    <h1>Thảo luận / Hỏi đáp</h1>

    <!-- Form đặt câu hỏi mới -->
    <el-card class="ask-card">
      <h3>Đặt câu hỏi mới</h3>
      <el-form :model="newQuestion" @submit.prevent="postQuestion">
        <el-form-item label="Câu hỏi">
          <el-input
              type="textarea"
              v-model="newQuestion.text"
              placeholder="Nhập câu hỏi của bạn..."
              rows="3"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="postQuestion">Đăng câu hỏi</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- Search -->
    <el-input
        placeholder="Tìm kiếm câu hỏi..."
        v-model="searchTerm"
        prefix-icon="el-icon-search"
        class="search-input"
        clearable
    />

    <!-- Danh sách câu hỏi -->
    <div class="questions-list">
      <el-card v-for="q in filteredQuestions" :key="q.id" class="question-card">
        <div class="question-text">{{ q.text }}</div>
        <div class="question-meta">
          <span>Đăng bởi: {{ q.user }}</span> |
          <span>{{ q.comments.length }} bình luận</span>
        </div>

        <!-- Comment section -->
        <div class="comments">
          <div v-for="(c, index) in q.comments" :key="index" class="comment">
            <strong>{{ c.user }}:</strong> {{ c.text }}
          </div>
          <el-input
              v-model="q.newComment"
              placeholder="Viết bình luận..."
              size="small"
              class="comment-input"
              @keyup.enter="postComment(q)"
          />
          <el-button type="success" size="small" @click="postComment(q)">Bình luận</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Mock data câu hỏi
const questions = ref([
  {
    id: 1,
    text: 'Làm sao để bắt đầu với Vue 3?',
    user: 'Minh',
    comments: [
      { user: 'Lan', text: 'Bạn nên học Composition API trước' },
      { user: 'An', text: 'Xem video hướng dẫn từ kênh chính thức nhé' },
    ],
    newComment: '',
  },
  {
    id: 2,
    text: 'Cách sử dụng Pinia trong project Vue 3?',
    user: 'Huy',
    comments: [],
    newComment: '',
  },
])

const newQuestion = ref({ text: '', user: 'Bạn' })
const searchTerm = ref('')

// Đăng câu hỏi mới
const postQuestion = () => {
  if (!newQuestion.value.text.trim()) return
  questions.value.unshift({
    id: Date.now(),
    text: newQuestion.value.text,
    user: newQuestion.value.user,
    comments: [],
    newComment: '',
  })
  newQuestion.value.text = ''
}

// Bình luận vào câu hỏi
const postComment = (q) => {
  if (!q.newComment.trim()) return
  q.comments.push({ user: 'Bạn', text: q.newComment })
  q.newComment = ''
}

// Filter câu hỏi theo tìm kiếm
const filteredQuestions = computed(() => {
  if (!searchTerm.value.trim()) return questions.value
  return questions.value.filter(q =>
      q.text.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})
</script>

<style scoped>
.discussion-page {
  max-width: 900px;
  margin: 30px auto;
  padding: 0 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.ask-card {
  margin-bottom: 20px;
  padding: 15px 20px;
}

.search-input {
  margin-bottom: 20px;
  width: 100%;
}

.questions-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.question-card {
  padding: 15px 20px;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0,0,0,0.05);
  background-color: #fff;
}

.question-text {
  font-size: 1rem;
  color: #333;
  margin-bottom: 5px;
}

.question-meta {
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 10px;
}

.comments {
  border-top: 1px solid #eee;
  padding-top: 10px;
}

.comment {
  font-size: 0.9rem;
  margin-bottom: 5px;
}

.comment-input {
  width: 100%;
  margin-bottom: 5px;
}
</style>
