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
import { Products } from '@/pages/ProductsPage/Products';
import { Pack } from '@/pages/Packpage/Pack';
import { Orders } from '@/pages/OrdersPage/Orders';
import SubscriptionsPage from '@/pages/admin/SubscriptionPage/Subscriptions';
import NotificationsPage from '@/pages/NotificationsPage/Notifications';
import SettingsPage from '@/pages/SettingsPage/Settings';
import { DeliveryDashboardLayout } from '@/pages/delivery/DashboardPage/ui/DeliveryDashboardLayout';
import { DeliveryDashboardPage } from '@/pages/delivery/DashboardPage/ui/DeliveryDashboardPage';
import DeliveriesPage from '@/pages/delivery/DeliveriesPage/Deliveries';
import AssignmentsPage from '@/pages/delivery/AssignmentsPage/Assignments';
import TrackingPage from '@/pages/delivery/TrackingPage/Tracking';
import TrackingListPage from '@/pages/delivery/TrackingListPage/TrackingList';
import { DashboardVendorLayout } from '@/pages/vendor/DashboardPage/DashboardVendorLayout';
import { DashboardVendorpage } from '@/pages/vendor/DashboardPage/ui/DashboardVendorpage';
import { VendorOrders } from '@/pages/vendor/OrdersPage/orders';
import { VendorProduct } from '@/pages/vendor/ProductPage/Products';
import { VendorPacks } from '@/pages/vendor/PacksPage/Packs';

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
          { path: RoutePath.admin.packs, element: <Pack /> },
          { path: RoutePath.admin.orders, element: <Orders /> },
          { path: RoutePath.admin.subscriptions, element: <SubscriptionsPage /> },
          { path: RoutePath.admin.notifications, element: <NotificationsPage/> },
          { path: RoutePath.admin.settings, element: <SettingsPage/> },
          // { path: routes.admin.plans, element: <PlansPage /> },
          // { path: routes.admin.reports, element: <ReportsPage /> },
        ],
      },
    ],
  },




  {
    element: <ProtectedRoute allowedRoles={['delivery']} />,
    children: [
      {
        element: <DeliveryDashboardLayout />,
        children: [
          { index: true, path: RoutePath.delivery.dashboard, element: <DeliveryDashboardPage /> },
          { path: RoutePath.delivery.deliveries, element: <DeliveriesPage /> },
          { path: RoutePath.delivery.assignments, element: <AssignmentsPage /> },
          { path: RoutePath.delivery.tracking, element: <TrackingListPage /> },     // List view
          { path: RoutePath.delivery.trackingDetail!, element: <TrackingPage /> },  // Detail view

        ],
      },
    ],
  },
  // 🎁 Vendor routes (example)
  {
    element: <ProtectedRoute allowedRoles={['vendor']} />,
    children: [
      {
        element: <DashboardVendorLayout />,
        children: [
          { index: true, path: RoutePath.vendor.dashboard, element: <DashboardVendorpage /> },
          { path: RoutePath.vendor.orders, element: <VendorOrders /> },
          { path: RoutePath.vendor.products, element: <VendorProduct /> },
          { path: RoutePath.vendor.packs, element: <VendorPacks /> },
          
          
        ],
      },
    ],
  },

 

  // 🔁 Redirect root → login
  { path: '/', element: <AuthPage /> },
]);