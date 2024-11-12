interface IDashboardMenus {
    title: string;
    icon: string;
    path: string;
    description?: string;
    hidden?: boolean;
    class?: string;
}

export const SIDEBAR_EXPAND_WIDTH = 280;
export const SIDEBAR_COLLAPSED_WIDTH = 72;
export const APP_MENU: Record<string, { name: string; routes: IDashboardMenus[] }> = {
    main: {
        name: 'Chung',
        routes: [
            {
                title: 'Dashboard',
                icon: 'LayoutDashboard',
                path: 'dashboard',
            },
        ],
    },
    settings: {
        name: 'Quản lý',
        routes: [
            {
                path: 'user',
                title: 'Người dùng',
                icon: 'User',
                description: 'Manage User',
            },
            {
                path: 'book',
                title: 'Sách',
                icon: 'BookOpenText',
                description: 'Manage Book',
            },
            {
                path: 'publisher',
                title: 'Nhà xuất bản',
                icon: 'Book',
                description: 'Manage publisher',
            },
            {
                path: 'order',
                title: 'Đơn mượn',
                icon: 'ShoppingCart',
                description: 'Manage Order',
            },
            {
                path: 'post',
                title: 'Bài viết',
                icon: 'Upload',
                description: 'Manage post',
            },
            {
                path: 'settings',
                title: 'Cài đặt',
                icon: 'Settings2',
                description: 'Settings',
            },
            {
                path: 'profile',
                title: 'Hồ sơ',
                icon: 'UsersRound',
                description: 'Profile',
            },
            {
                path: 'changePassword',
                title: 'Đổi mật khẩu',
                icon: 'KeyRound',
                description: 'ChangePassword',
            },

            {
                path: '',
                title: 'Đăng xuất',
                icon: 'LogOut',
                description: 'LogOut',
                class: 'text-red-500',
            },
        ],
    },
};

export const globalSearch = {};
