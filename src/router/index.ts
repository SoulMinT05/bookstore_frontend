import { createRouter, createWebHistory, type RouteMeta } from 'vue-router';
import DashboardLayoutVue from '@/layouts/dashboard.vue';

interface IRouteMeta {
    title: string;
}

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/views/HomeView.vue'),
            meta: {
                title: 'Home',
            } as RouteMeta & IRouteMeta,
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/Login.vue'),
            meta: {
                title: 'Login',
            } as RouteMeta & IRouteMeta,
            // RouteMeta: mô tả cấu trúc của meta mặc định trong Vue Router
            // IRouteMeta: có thuộc tính title --> quản lý dễ dàng
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('@/views/Register.vue'),
            meta: {
                title: 'Register',
            } as RouteMeta & IRouteMeta,
        },
        {
            path: '/admin',
            component: DashboardLayoutVue,
            redirect: '/admin/dashboard',
            meta: {
                title: 'Admin',
            },
            children: [
                {
                    path: 'dashboard',
                    // name: 'dashboard',
                    component: () => import('@/views/admin/Dashboard.vue'),
                    meta: {
                        title: 'Dashboard',
                    } as RouteMeta & IRouteMeta,
                },
                {
                    path: 'task',
                    // name: 'tasks_index',
                    component: () => import('@/views/admin/Tasks.vue'),
                    meta: {
                        title: 'Tasks',
                    } as RouteMeta & IRouteMeta,
                },
                {
                    path: 'user',
                    // name: 'user_index',
                    component: () => import('@/views/admin/User.vue'),
                    meta: {
                        title: 'User',
                    } as RouteMeta & IRouteMeta,
                },
                {
                    path: 'book',
                    component: () => import('@/views/admin/Book.vue'),
                    meta: {
                        title: 'Book',
                    } as RouteMeta & IRouteMeta,
                },
                {
                    path: 'publisher',
                    component: () => import('@/views/admin/Publisher.vue'),
                    meta: {
                        title: 'Publisher',
                    } as RouteMeta & IRouteMeta,
                },
                {
                    path: 'order',
                    component: () => import('@/views/admin/Order.vue'),
                    meta: {
                        title: 'Order',
                    } as RouteMeta & IRouteMeta,
                },
                {
                    path: 'post',
                    component: () => import('@/views/admin/Post.vue'),
                    meta: {
                        title: 'Post',
                    } as RouteMeta & IRouteMeta,
                },
                {
                    path: 'settings',
                    component: () => import('@/views/admin/Settings.vue'),
                    meta: {
                        title: 'Settings',
                    } as RouteMeta & IRouteMeta,
                },
                {
                    path: 'profile',
                    name: 'profile',
                    component: () => import('@/views/admin/Profile.vue'),
                    meta: {
                        title: 'Profile',
                    } as RouteMeta & IRouteMeta,
                },
                {
                    path: 'changePassword',
                    name: 'changePassword',
                    component: () => import('@/views/admin/ChangePassword.vue'),
                    meta: {
                        title: 'ChangePassword',
                    } as RouteMeta & IRouteMeta,
                },
            ],
        },
        // {
        //     path: '/changePassword',
        //     name: 'changePassword',
        //     component: () => import('@/views/ChangePassword.vue'),
        //     meta: {
        //         title: 'ChangePassword',
        //     } as RouteMeta & IRouteMeta,
        // },
        {
            path: '/:pathMatch(.*)',
            name: 'not-found',
            component: () => import('@/views/404.vue'),
            meta: {
                title: 'Page Not Found',
            } as RouteMeta & IRouteMeta,
        },
    ],
});

// document.title (tiêu đề của trang) sẽ được thay đổi dựa trên giá trị của loc.meta.title (meta tag của route hiện tại).
router.beforeEach((to, from, next) => {
    // Update document title
    if (to.meta.title) {
        document.title = to.meta.title as string;
    }

    // Get the user data from localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userData = user?.userData;
    if (to.path === '/login' && (userData?.role === 'admin' || userData?.role === 'staff')) {
        return next('/admin'); // Điều hướng tới /admin nếu role là admin hoặc staff
    }
    if (to.path === '/login' && userData?.role === 'staff') {
        return next('/admin'); // Điều hướng tới /admin nếu role là admin hoặc staff
    }
    // Check if the route is under `/dashboard`, meaning it's an admin route
    if (to.path.startsWith('/admin')) {
        // If the user doesn't have the 'admin' role, redirect to login
        if (userData?.role !== 'admin' && userData?.role !== 'staff') {
            return next({ path: '/' });
        }
    }

    // Proceed to the route if everything is okay
    next();
});

export default router;
