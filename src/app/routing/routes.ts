// Role-based routes
export const RoutePath = {
  // Auth
  login: '/login',
  register: '/register',

  // Admin
  admin: {
    root: '/admin',
    dashboard: '/admin',
    orders: '/admin/orders',
    users: '/admin/users',
    vendors: '/admin/vendors',
    plans: '/admin/plans',
    reports: '/admin/reports',
    products: '/admin/products',
    packs: '/admin/packs',
  },

  // Vendor
  vendor: {
    root: '/vendor',
    dashboard: '/vendor',
    products: '/vendor/products',
    orders: '/vendor/orders',
  },

  // Delivery
  delivery: {
    root: '/delivery',
    dashboard: '/delivery',
    assignments: '/delivery/assignments',
  },
} as const;

export type AdminRoute = keyof typeof RoutePath.admin;