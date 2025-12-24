import { StatsOverview } from '@/widgets/StatsOverview';
import { AdminQuickActions } from '@/widgets/AdminQuickActions/ui/AdminQuickActions';

export const DeliveryDashboardPage = () => {
    return (
      <div className="p-6 space-y-6 ">
            <StatsOverview />
<AdminQuickActions/>
      </div>
    );
  };