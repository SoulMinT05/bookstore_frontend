interface IDashboardMenus {
  title: string
  icon: string
  path: string
  description?: string
  hidden?: boolean
}

export const SIDEBAR_EXPAND_WIDTH = 280
export const SIDEBAR_COLLAPSED_WIDTH = 72
export const APP_MENU: Record<string, { name: string; routes: IDashboardMenus[] }> = {
  main: {
    name: 'General',
    routes: [
      {
        title: 'Dashboard',
        icon: 'LayoutDashboard',
        path: 'home'
      },
      {
        title: 'Tasks',
        icon: 'ClipboardCheck',
        path: 'task',
        description: 'Manage Tasks'
      }
    ]
  },
  settings: {
    name: 'Manage system',
    routes: [
      {
        path: 'user',
        title: 'User',
        icon: 'User',
        description: 'Manage User'
      },
      {
        path: 'book',
        title: 'Book',
        icon: 'BookOpenText',
        description: 'Manage Book'
      },
      {
        path: 'order',
        title: 'Order',
        icon: 'ShoppingCart',
        description: 'Manage Order'
      },
      {
        path: 'post',
        title: 'Post',
        icon: 'Upload',
        description: 'Manage post'
      },
      {
        path: 'settings',
        title: 'Settings',
        icon: 'Settings2',
        description: 'Settings'
      }
    ]
  }
}

export const globalSearch = {}
