<template>
  <div class="layout-container">
    <Navbar />
    <Search/>
    <main class="main-content">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import Search from '../components/Search.vue'
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}

.layout-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
}

.main-content {
  flex: 1;
  width: 100%;
}
</style>
