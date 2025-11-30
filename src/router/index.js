import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import AuthLayout from '../layouts/AuthLayout.vue'
import SearchLayouts from "../layouts/SearchLayouts.vue";

import Home from '../pages/user/Home.vue'
import Profile from '../pages/user/Profile.vue'
import CourseDetail from '../pages/user/CourseDetail.vue'
import Cart from '../pages/user/Cart.vue'
import Checkout from '../pages/user/Checkout.vue'
import MyCourses from '../pages/user/MyCourses.vue'
import Discussion from "../pages/user/Discussion.vue";
import Category from '../pages/user/Category.vue'

import Login from '../pages/auth/Login.vue'
import Register from '../pages/auth/Register.vue'
import ForgotPassword from '../pages/auth/ForgotPassword.vue'

import MainLayout from '../layouts/admin/MainLayouts.vue'

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
        path: '/auth',
        component: AuthLayout,
        children: [
            { path: 'login', name: 'login', component: Login },
            { path: 'register', name: 'register', component: Register },
            { path: 'forgot-password', name: 'forgotPassword', component: ForgotPassword }
        ]
    },
    {
        path: '/',
        component: MainLayout,
        redirect: '/dashboard',
        meta: { requiresAuth: true },
        children: [
            // Dashboard
            {
                path: 'dashboard',
                name: 'Dashboard',
                component: () => import('../pages/admin/Dashboard.vue'),
                meta: { title: 'Dashboard', icon: 'Odometer' }
            },

            {
                path: 'students',
                name: 'Students',
                component: () => import('../pages/admin/students/StudentList.vue'),
                meta: { title: 'Quản lý học viên', icon: 'UserFilled' }
            },
            {
                path: 'students/create',
                name: 'StudentCreate',
                component: () => import('../pages/admin/students/StudentForm.vue'),
                meta: { title: 'Thêm học viên', parent: 'Students' }
            },
            {
                path: 'students/:id/edit',
                name: 'StudentEdit',
                component: () => import('../pages/admin/students/StudentForm.vue'),
                meta: { title: 'Sửa học viên', parent: 'Students' },
                props: true
            },
            {
                path: 'students/:id',
                name: 'StudentDetail',
                component: () => import('../pages/admin/students/StudentDetail.vue'),
                meta: { title: 'Chi tiết học viên', parent: 'Students' },
                props: true
            },

            {
                path: 'courses',
                name: 'Courses',
                component: () => import('../pages/admin/courses/CourseList.vue'),
                meta: { title: 'Quản lý khóa học', icon: 'Reading' }
            },
            {
                path: 'courses/create',
                name: 'CourseCreate',
                component: () => import('../pages/admin/courses/CourseForm.vue'),
                meta: { title: 'Thêm khóa học', parent: 'Courses' }
            },
            {
                path: 'courses/:id/edit',
                name: 'CourseEdit',
                component: () => import('../pages/admin/courses/CourseForm.vue'),
                meta: { title: 'Sửa khóa học', parent: 'Courses' },
                props: true
            },
            {
                path: 'courses/:courseId/lessons',
                name: 'CourseLessons',
                component: () => import('../pages/admin/lessons/LessonList.vue'),
                meta: { title: 'Bài học', parent: 'Courses' },
                props: true
            },
            {
                path: 'lessons',
                name: 'Lessons',
                component: () => import('../pages/admin/lessons/LessonList.vue'),
                meta: { title: 'Quản lý bài học', icon: 'Document' }
            },
            {
                path: 'lessons/create',
                name: 'LessonCreate',
                component: () => import('../pages/admin/lessons/LessonForm.vue'),
                meta: { title: 'Thêm bài học', parent: 'Lessons' }
            },
            {
                path: 'lessons/:id/edit',
                name: 'LessonEdit',
                component: () => import('../pages/admin/lessons/LessonForm.vue'),
                meta: { title: 'Sửa bài học', parent: 'Lessons' },
                props: true
            },

            // Enrollments
            {
                path: 'enrollments',
                name: 'Enrollments',
                component: () => import('../pages/admin/enrollments/EnrollmentList.vue'),
                meta: { title: 'Quản lý đăng ký học', icon: 'Tickets' }
            },
            {
                path: 'enrollments/detail',
                name: 'EnrollmentDetail',
                component: () => import('../pages/admin/enrollments/EnrollmentDetail.vue'),
                meta: { title: 'Xem chi tiết đăng ký', parent: 'EnrollmentsDetail' }
            },
            {
                path: 'enrollments/create',
                name: 'EnrollmentCreate',
                component: () => import('../pages/admin/enrollments/EnrollmentForm.vue'),
                meta: { title: 'Đăng ký học mới', parent: 'Enrollments' }
            },
            {
                path: 'enrollments/:id/edit',
                name: 'EnrollmentEdit',
                component: () => import('../pages/admin/enrollments/EnrollmentForm.vue'),
                meta: { title: 'Sửa đăng ký', parent: 'Enrollments' },
                props: true
            },
            {
                path: 'banners',
                name: 'Banners',
                component: () => import('../pages/admin/banners/BannerList.vue'),
                meta: { title: 'Quản lý banners', icon: 'Image' }
            },
            {
                path: 'banners/detail/:id',
                name: 'BannerDetail',
                component: () => import('../pages/admin/banners/BannerDetail.vue'),
                meta: { title: 'Xem chi tiết banners', parent: 'Banners' },
                props: true
            },
            {
                path: 'banners/create',
                name: 'BannerCreate',
                component: () => import('../pages/admin/banners/BannerForm.vue'),
                meta: { title: 'Tạo banners mới', parent: 'Banners' }
            },
            {
                path: 'banners/:id/edit',
                name: 'BannerEdit',
                component: () => import('../pages/admin/banners/BannerForm.vue'),
                meta: { title: 'Sửa banners', parent: 'Banners' },
                props: true
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
