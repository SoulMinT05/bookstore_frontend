import { createRouter, createWebHistory, type RouteMeta } from 'vue-router'
import DashboardLayoutVue from '@/layouts/dashboard.vue'

interface IRouteMeta {
  title: string
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard/home'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: {
        title: 'Login'
      } as RouteMeta & IRouteMeta
      // RouteMeta: mô tả cấu trúc của meta mặc định trong Vue Router
      // IRouteMeta: có thuộc tính title --> quản lý dễ dàng
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/Register.vue'),
      meta: {
        title: 'Register'
      } as RouteMeta & IRouteMeta
    },
    {
      path: '/dashboard',
      component: DashboardLayoutVue,
      redirect: '/dashboard/home',
      meta: {
        title: 'Dashboard'
      },
      children: [
        {
          path: 'home',
          // name: 'home',
          component: () => import('@/views/dashboard/Home.vue'),
          meta: {
            title: 'Home'
          } as RouteMeta & IRouteMeta
        },
        {
          path: 'task',
          // name: 'tasks_index',
          component: () => import('@/views/dashboard/Tasks.vue'),
          meta: {
            title: 'Tasks'
          } as RouteMeta & IRouteMeta
        },
        {
          path: 'user',
          // name: 'user_index',
          component: () => import('@/views/dashboard/User.vue'),
          meta: {
            title: 'User'
          } as RouteMeta & IRouteMeta
        },
        {
          path: 'book',
          component: () => import('@/views/dashboard/Book.vue'),
          meta: {
            title: 'Book'
          } as RouteMeta & IRouteMeta
        },
        {
          path: 'order',
          component: () => import('@/views/dashboard/Order.vue'),
          meta: {
            title: 'Order'
          } as RouteMeta & IRouteMeta
        },
        {
          path: 'post',
          component: () => import('@/views/dashboard/Post.vue'),
          meta: {
            title: 'Post'
          } as RouteMeta & IRouteMeta
        },
        {
          path: 'settings',
          component: () => import('@/views/dashboard/Settings.vue'),
          meta: {
            title: 'Settings'
          } as RouteMeta & IRouteMeta
        }
      ]
    },
    {
      path: '/:pathMatch(.*)',
      name: 'not-found',
      component: () => import('@/views/404.vue'),
      meta: {
        title: 'Page Not Found'
      } as RouteMeta & IRouteMeta
    }
  ]
})

// document.title (tiêu đề của trang) sẽ được thay đổi dựa trên giá trị của loc.meta.title (meta tag của route hiện tại).
router.beforeEach((loc) => {
  document.title = loc.meta.title as string
})

export default router
