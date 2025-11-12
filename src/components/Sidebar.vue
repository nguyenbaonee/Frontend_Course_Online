<template>
  <aside class="sidebar">
    <router-link to="/admin">Dashboard</router-link>
    <router-link to="/admin/users">Manage Users</router-link>
    <router-link to="/admin/courses">Manage Courses</router-link>
  </aside>
</template>

<style>
.sidebar { width: 200px; padding: 20px; background: #ddd; display: flex; flex-direction: column; gap: 10px; }
</style>
