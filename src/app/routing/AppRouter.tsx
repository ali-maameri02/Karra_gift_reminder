import { createBrowserRouter } from 'react-router-dom';

// 🔐 Auth (shared layer)
import AuthPage from '@/pages/user/RegistrationPage/index'; // ✅ default export from index.tsx

// 👑 Admin (pages layer)
import DashboardPage from '@/pages/admin/DashboardPage/';
// import UsersPage from '@/pages/admin/UsersPage';
// import VendorsPage from '@/pages/admin/VendorsPage';
// import OrdersPage from '@/pages/admin/OrdersPage';
// import PlansPage from '@/pages/admin/PlansPage';
// import ReportsPage from '@/pages/admin/ReportsPage';

// 🎁 Vendor & 🚚 Delivery (add later)
// import VendorDashboard from '@/pages/vendor/DashboardPage';
// import DeliveryDashboard from '@/pages/delivery/DashboardPage';

// 🧩 Layouts & Guards (app layer)
// import { DashboardLayout } from '@/pages/admin/DashboardPage/ui/DashboardLayout';
// import { ProtectedRoute } from './ProtectedRoute';
import { RoutePath } from './routes';
import { ProtectedRoute } from './ProtectedRoute';
import { DashboardLayout } from '@/pages/admin/DashboardPage/ui/DashboardLayout';
import { UsersPage } from '@/pages/admin/UsersPage';
import { Products } from '@/pages/admin/ProductsPage/ProductListPage/Products';

export const router = createBrowserRouter([
  // 🔓 Public
  { path: RoutePath.login, element: <AuthPage /> },
  { path: RoutePath.register, element: <AuthPage /> }, // Same page, switches mode

  // 👑 Admin (nested under DashboardLayout)
  {
    element: <ProtectedRoute allowedRoles={['admin']} />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { index: true, path: RoutePath.admin.dashboard, element: <DashboardPage /> },
          { path: RoutePath.admin.users, element: <UsersPage /> },
          { path: RoutePath.admin.products, element: <Products /> },
          // { path: routes.admin.orders, element: <OrdersPage /> },
          // { path: routes.admin.plans, element: <PlansPage /> },
          // { path: routes.admin.reports, element: <ReportsPage /> },
        ],
      },
    ],
  },

  // 🎁 Vendor routes (example)
  // {
  //   element: <ProtectedRoute allowedRoles={['vendor']} />,
  //   children: [
  //     { path: routes.vendor.dashboard, element: <VendorDashboard /> },
  //   ],
  // },

  // 🚚 Delivery routes (example)
  // {
  //   element: <ProtectedRoute allowedRoles={['delivery']} />,
  //   children: [
  //     { path: routes.delivery.dashboard, element: <DeliveryDashboard /> },
  //   ],
  // },

  // 🔁 Redirect root → login
  { path: '/', element: <AuthPage /> },
]);