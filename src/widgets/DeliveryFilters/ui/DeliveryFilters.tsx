'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface DeliveryFiltersProps {
  statusFilter: string;
  onStatusChange: (status: string) => void;
  dateRange: string;
  onDateRangeChange: (range: string) => void;
}

export const DeliveryFilters: React.FC<DeliveryFiltersProps> = ({
  statusFilter,
  onStatusChange,
  dateRange,
  onDateRangeChange,
}) => {
  const statusBadges = [
    { value: 'all', label: 'All Status', count: 42 },
    { value: 'assigned', label: 'Assigned', count: 12 },
    { value: 'in_transit', label: 'In Transit', count: 8 },
    { value: 'delivered', label: 'Delivered', count: 22 },
  ];

  return (
    <div className="flex flex-wrap items-center gap-3 mb-6">
      {/* Status badges */}
      <div className="flex flex-wrap gap-2">
        {statusBadges.map((badge) => (
          <Badge
            key={badge.value}
            variant={statusFilter === badge.value ? 'default' : 'secondary'}
            className="cursor-pointer hover:opacity-80 transition-all"
            onClick={() => onStatusChange(badge.value)}
          >
            {badge.label} ({badge.count})
          </Badge>
        ))}
      </div>

      {/* Date range */}
      <Select value={dateRange} onValueChange={onDateRangeChange}>
        <SelectTrigger className="w-[180px] bg-white">
          <SelectValue placeholder="Date range" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="today">Today</SelectItem>
          <SelectItem value="week">This Week</SelectItem>
          <SelectItem value="month">This Month</SelectItem>
        </SelectContent>
      </Select>

      <Button variant="outline" size="sm" className="rounded-full">
        Clear filters
      </Button>
    </div>
  );
};
