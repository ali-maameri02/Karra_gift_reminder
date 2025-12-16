import { useAuth } from '@/app/providers/AuthProvider';
import { AdminSidebar } from '../AdminSidebar/ui/Adminsidebar';
import { VendorSidebar } from '../VendorSidebar/ui/VendorSidebar';
import { DeliverySidebar } from '../DeliverySidebar/ui/DeliverySidebar';

export const Sidebar = () => {
  const { userRole } = useAuth();

  switch (userRole) {
    case 'admin':
      return <AdminSidebar />;
    case 'vendor':
      return <VendorSidebar />;
    case 'delivery':
      return <DeliverySidebar />;
    default:
      return <div>Loading...</div>;
  }
};