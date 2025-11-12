import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import AdminLayout from '../layouts/AdminLayout.vue'
import AuthLayout from '../layouts/AuthLayout.vue'
import SearchLayouts from "../layouts/SearchLayouts.vue";

// Pages User
import Home from '../pages/user/Home.vue'
import Profile from '../pages/user/Profile.vue'
import CourseDetail from '../pages/user/CourseDetail.vue'
import Cart from '../pages/user/Cart.vue'
import Checkout from '../pages/user/Checkout.vue'
import MyCourses from '../pages/user/MyCourses.vue'
import Discussion from "../pages/user/Discussion.vue";
import Category from '../pages/user/Category.vue'
// Pages Admin
import Dashboard from '../pages/admin/Dashboard.vue'
import ManageUsers from '../pages/admin/ManageUsers.vue'
import ManageCourses from '../pages/admin/ManageCourses.vue'
import ManageSettings from '../pages/admin/Settings.vue'
import ManageReport from '../pages/admin/ManageReport.vue'

// Pages Auth
import Login from '../pages/auth/Login.vue'
import Register from '../pages/auth/Register.vue'
import ForgotPassword from '../pages/auth/ForgotPassword.vue'

// import { useAuthStore } from '../store/authStore'

const routes = [
    {
        path: '/',
        component: DefaultLayout,
        children: [
            { path: '', name: 'home', component: Home },
            { path: 'profile', name: 'profile', component: Profile, meta: { requiresAuth: true } },
            { path: 'course/:id', name: 'courseDetail', component: CourseDetail },
            { path: 'cart', name: 'cart', component: Cart },
            { path: 'checkout', name: 'checkout', component: Checkout, meta: { requiresAuth: true } },
            { path: 'purchased', name: 'purchased', component: MyCourses },
            { path: 'discussion', name: 'discussion', component: Discussion },
        ]
    },
    {
        path: '/',
        component: SearchLayouts,
        children: [
            {path: 'search', name: 'search', component: Category}
        ]
    },
    {
        path: '/admin',
        component: AdminLayout,
        meta: { requiresAdmin: true },
        children: [
            { path: '', name: 'dashboard', component: Dashboard },
            { path: 'users', name: 'manageUsers', component: ManageUsers },
            { path: 'courses', name: 'manageCourses', component: ManageCourses },
            { path: 'setting', name: 'manageSetting', component: ManageSettings },
            { path: 'report', name: 'manageReport', component: ManageReport },
        ]
    },
    {
        path: '/auth',
        component: AuthLayout,
        children: [
            { path: 'login', name: 'login', component: Login },
            { path: 'register', name: 'register', component: Register },
            { path: 'forgot-password', name: 'forgotPassword', component: ForgotPassword }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// Navigation Guard
// router.beforeEach((to, from, next) => {
//     const authStore = useAuthStore()
//     const user = authStore.user
//
//     if (to.meta.requiresAuth && !user) next('/auth/login')
//     else if (to.meta.requiresAdmin && (!user || !user.isAdmin)) next('/')
//     else next()
// })

export default router
