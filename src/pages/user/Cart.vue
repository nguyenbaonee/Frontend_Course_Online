<template>
  <div class="cart-page">
    <h1>Giỏ hàng</h1>
    <div class="cart-container">
      <!-- Left: Course List -->
      <div class="cart-items">
        <div v-for="course in cart" :key="course.id" class="cart-item">
          <img :src="course.image" alt="thumbnail" class="course-thumb" />
          <div class="course-info">
            <h3>{{ course.title }}</h3>
            <p class="course-instructor">By {{ course.instructor }}</p>
            <p class="course-rating">
              <span v-for="n in 5" :key="n" class="star" :class="{ filled: n <= course.rating }">★</span>
            </p>
            <p class="course-price">{{ formatPrice(course.price * (1 - course.discount/100)) }}</p>
          </div>
          <el-button type="danger" size="small" @click="removeCourse(course.id)">Remove</el-button>
        </div>
      </div>

      <!-- Right: Order Summary -->
      <div class="order-summary">
        <h3>Order Summary</h3>
        <p>Original Price: {{ formatPrice(originalPrice) }}</p>
        <p>Discount: -{{ formatPrice(discountAmount) }}</p>
        <p><strong>Total: {{ formatPrice(totalPrice) }}</strong></p>
        <el-checkbox v-model="agreeTerms">
          I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </el-checkbox>
        <el-button type="primary" :disabled="!agreeTerms" @click="checkout" style="margin-top: 15px">
          Proceed to Checkout
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const cart = ref([
  {
    id: 1,
    title: 'The Complete 2024 Web Development Bootcamp',
    price: 8499,
    discount: 15,
    instructor: 'Dr. Angela Yu',
    rating: 5,
    image: 'https://picsum.photos/100/70?random=1',
  },
  {
    id: 2,
    title: 'Mastering UX/UI Design with Figma',
    price: 4999,
    discount: 10,
    instructor: 'Sarah Johnson',
    rating: 5,
    image: 'https://picsum.photos/100/70?random=2',
  },
])

const formatPrice = (value) => '$' + value.toFixed(2)

const removeCourse = (id) => {
  cart.value = cart.value.filter(c => c.id !== id)
}

const originalPrice = computed(() => cart.value.reduce((sum, c) => sum + c.price, 0))
const discountAmount = computed(() => cart.value.reduce((sum, c) => sum + c.price * c.discount/100, 0))
const totalPrice = computed(() => originalPrice.value - discountAmount.value)
const agreeTerms = ref(false)
const checkout = () => alert(`Paid: ${formatPrice(totalPrice.value)}`)
</script>

<style scoped>
.cart-page {
  max-width: 1200px;
  margin: 30px auto;
  padding: 0 20px;
  font-family: 'Segoe UI', sans-serif;
}

.cart-container {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

/* Left Column */
.cart-items {
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.cart-item {
  display: flex;
  align-items: center;
  background: #fff;
  padding: 10px 15px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  gap: 15px;
}

.course-thumb {
  width: 100px;
  height: 70px;
  object-fit: cover;
  border-radius: 6px;
}

.course-info {
  flex: 1;
}

.course-info h3 {
  margin: 0;
  font-size: 1rem;
  color: #333;
}

.course-instructor {
  font-size: 0.85rem;
  color: #666;
}

.course-rating .star {
  color: #ccc;
  font-size: 0.85rem;
}
.course-rating .filled {
  color: #f5a623;
}

.course-price {
  font-weight: bold;
  color: #111;
  margin-top: 5px;
}

/* Right Column */
.order-summary {
  flex: 1;
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.05);
}

.order-summary h3 {
  margin-top: 0;
  margin-bottom: 15px;
}

.order-summary p {
  margin: 8px 0;
}

.order-summary strong {
  font-size: 1.2rem;
  color: #111;
}

.order-summary a {
  color: #409eff;
  text-decoration: none;
}

.order-summary a:hover {
  text-decoration: underline;
}

/* Responsive */
@media (max-width: 768px) {
  .cart-container {
    flex-direction: column;
  }
  .cart-item {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
