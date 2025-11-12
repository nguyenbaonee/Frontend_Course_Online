<template>
  <div class="cart-page">
    <h1>Giỏ hàng</h1>

    <div v-for="course in cart" :key="course.id" class="cart-item">
      <div class="course-main">
        <div class="course-info">
          <h3>{{ course.title }}</h3>
          <p class="course-meta">
            <span>Tác giả: {{ course.instructor }}</span> |
            <span>Đánh giá:
              <span v-for="n in 5" :key="n" class="star" :class="{ filled: n <= course.rating }">★</span>
              ({{ course.reviews.length }} đánh giá)
            </span>
          </p>
          <p class="course-desc">{{ course.description }}</p>
        </div>
        <div class="course-actions">
          <p class="course-price">{{ formatPrice(course.price * (1 - course.discount/100)) }}</p>
          <el-button type="danger" size="small" @click="removeCourse(course.id)">Xóa</el-button>
        </div>
      </div>
      <hr/>
    </div>

    <div class="order-summary">
      <h3>Tóm tắt đơn đặt hàng</h3>
      <p>Giá gốc: {{ formatPrice(originalPrice) }}</p>
      <p>Chiết khấu: -{{ formatPrice(discountAmount) }}</p>
      <p><strong>Tổng tiền ({{ cart.length }} khóa học): {{ formatPrice(totalPrice) }}</strong></p>
      <el-checkbox v-model="agreeTerms">
        Bằng việc hoàn tất giao dịch mua, bạn đồng ý với các <a href="#">Điều khoản dịch vụ</a> này.
      </el-checkbox>
      <el-button type="primary" :disabled="!agreeTerms" style="margin-top: 15px" @click="checkout">
        Thanh toán
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Dữ liệu test
const cart = ref([
  {
    id: 1,
    title: 'Vue 3 từ cơ bản đến nâng cao',
    price: 599000,
    discount: 20,
    instructor: 'Nguyễn Văn A',
    description: 'Học Vue 3 Composition API, Router, Pinia, tối ưu hiệu suất.',
    rating: 4,
    reviews: [{ user: 'Minh', rating: 5 }, { user: 'Lan', rating: 4 }],
  },
  {
    id: 2,
    title: 'ReactJS căn bản',
    price: 499000,
    discount: 15,
    instructor: 'Trần Thị B',
    description: 'Học ReactJS, Hooks, State Management, làm dự án thực tế.',
    rating: 5,
    reviews: [{ user: 'Huy', rating: 5 }],
  },
  {
    id: 3,
    title: 'NodeJS + Express',
    price: 549000,
    discount: 10,
    instructor: 'Lê Văn C',
    description: 'Xây dựng API với NodeJS & Express, kết nối database.',
    rating: 4,
    reviews: [{ user: 'An', rating: 4 }],
  },
])

const formatPrice = (value) => value.toLocaleString('vi-VN') + '₫'

const removeCourse = (id) => {
  cart.value = cart.value.filter(c => c.id !== id)
}

const originalPrice = computed(() =>
    cart.value.reduce((sum, c) => sum + c.price, 0)
)

const discountAmount = computed(() =>
    cart.value.reduce((sum, c) => sum + (c.price * c.discount / 100), 0)
)

const totalPrice = computed(() =>
    originalPrice.value - discountAmount.value
)

const agreeTerms = ref(false)

const checkout = () => {
  alert(`Thanh toán thành công: ${formatPrice(totalPrice.value)}`)
}
</script>

<style scoped>
.cart-page {
  max-width: 900px;
  margin: 30px auto;
  padding: 0 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Khóa học */
.cart-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0,0,0,0.05);
  padding: 15px 20px;
  transition: transform 0.2s;
}
.cart-item:hover {
  transform: translateY(-3px);
}

.course-main {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
}

.course-info {
  flex: 1 1 60%;
}

.course-info h3 {
  margin: 0 0 5px 0;
  font-size: 1.2rem;
  color: #333;
}

.course-meta {
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 8px;
}

.course-desc {
  font-size: 0.95rem;
  color: #444;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 2 dòng */
  -webkit-box-orient: vertical;
}

.star {
  color: #ccc;
}
.star.filled {
  color: #f5a623;
}

/* Giá & nút xóa */
.course-actions {
  flex: 0 0 150px;
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;
}

.course-price {
  font-weight: bold;
  font-size: 1.1rem;
  color: #409eff;
}

/* Order summary */
.order-summary {
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 25px 20px;
  margin-top: 30px;
  background-color: #fdfdfd;
  box-shadow: 0 6px 15px rgba(0,0,0,0.03);
}

.order-summary h3 {
  margin-bottom: 15px;
  font-size: 1.3rem;
  color: #333;
}
.order-summary p {
  margin: 8px 0;
  font-size: 1rem;
  color: #555;
}
.order-summary strong {
  font-size: 1.15rem;
  color: #111;
}
.order-summary a {
  color: #409eff;
  text-decoration: none;
}
.order-summary a:hover {
  text-decoration: underline;
}

/* Button thanh toán */
.el-button {
  border-radius: 8px;
  padding: 12px 20px;
  font-weight: 600;
  transition: all 0.3s;
}
.el-button:disabled {
  opacity: 0.6;
}

/* Responsive */
@media (max-width: 768px) {
  .course-main {
    flex-direction: column;
  }
  .course-actions {
    flex: 1 1 100%;
    align-items: flex-start;
    margin-top: 10px;
  }
}
</style>

