<template>
  <div class="chat-container">
    <el-card :body-style="{ padding: '20px' }">
      <div class="chat-box">
        <!-- Hiển thị tin nhắn -->
        <div v-for="(message, index) in messages" :key="index" :class="['message', message.sender]">
          <el-tag v-if="message.sender === 'ai'" type="success">{{ message.text }}</el-tag>
          <el-tag v-else>{{ message.text }}</el-tag>
        </div>

        <!-- Hiển thị loading khi đang gọi API -->
        <div v-if="loading" class="message ai">
          <el-tag type="info">Đang xử lý...</el-tag>
        </div>
      </div>

      <!-- Nhập tin nhắn -->
      <el-input
          v-model="inputMessage"
          placeholder="Hỏi về khóa học của tôi..."
          @keyup.enter.native="handleSendMessage"
          show-word-limit
          :maxlength="200"
          class="input-message"
      />
      <el-button @click="handleSendMessage" type="primary" class="send-button">Gửi</el-button>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { fetchGeminiResponse, fetchCourses } from '../../services/apiService';  // Import API service

// Các state quản lý tin nhắn, khóa học, và trạng thái loading
const messages = ref([]);
const inputMessage = ref('');
const loading = ref(false);
const courses = ref([]);  // Chứa thông tin các khóa học

// Lấy dữ liệu khóa học từ API
const getCourses = async () => {
  try {
    const courseData = await fetchCourses();  // Fetch khóa học từ API backend
    courses.value = courseData;
  } catch (error) {
    console.error("Lỗi khi lấy khóa học:", error);
  }
};

// Hàm xử lý gửi tin nhắn và nhận phản hồi từ Google Cloud AI (Gemini)
const handleSendMessage = async () => {
  if (!inputMessage.value.trim()) return;

  // Thêm tin nhắn của người dùng vào danh sách
  messages.value.push({ text: inputMessage.value, sender: 'user' });
  inputMessage.value = '';
  loading.value = true;

  try {
    // Lấy tên các khóa học hiện có
    const courseNames = courses.value.map(course => course.name).join(', ');

    // Tạo prompt cho Gemini dựa trên khóa học hiện có và câu hỏi người dùng
    const aiPrompt = `Hỏi về khóa học: ${inputMessage.value}. Các khóa học hiện có: ${courseNames}.`;

    // Gửi yêu cầu đến Google Gemini API với prompt đã tạo
    const aiMessage = await fetchGeminiResponse(aiPrompt);

    // Thêm phản hồi từ Gemini vào danh sách tin nhắn
    messages.value.push({ text: aiMessage, sender: 'ai' });
  } catch (error) {
    console.error("Lỗi khi xử lý yêu cầu Gemini:", error);
    messages.value.push({ text: 'Có lỗi xảy ra, vui lòng thử lại!', sender: 'ai' });
  } finally {
    loading.value = false;  // Đặt trạng thái loading thành false sau khi xử lý xong
  }
};

// Fetch khóa học khi component được mount
getCourses();
</script>

<style scoped>
.chat-container {
  width: 100%;
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
}

.chat-box {
  max-height: 400px;
  overflow-y: auto;
  margin-bottom: 20px;
}

.message {
  padding: 10px;
  margin: 5px;
  border-radius: 5px;
  max-width: 80%;
  margin-left: auto;
  margin-right: auto;
}

.user {
  background-color: #d1e7ff;
  text-align: left;
}

.ai {
  background-color: #e0ffe0;
  text-align: right;
}

.input-message {
  width: calc(100% - 100px);
  margin-right: 10px;
}

.send-button {
  width: 80px;
}
</style>
