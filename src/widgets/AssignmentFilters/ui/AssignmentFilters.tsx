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

interface AssignmentFiltersProps {
  priorityFilter: string;
  onPriorityChange: (priority: string) => void;
  distanceFilter: string;
  onDistanceChange: (distance: string) => void;
}

export const AssignmentFilters: React.FC<AssignmentFiltersProps> = ({
  priorityFilter,
  onPriorityChange,
  distanceFilter,
  onDistanceChange,
}) => {
  const priorityBadges = [
    { value: 'all', label: 'All Priority', count: 15 },
    { value: 'low', label: 'Low', count: 4 },
    { value: 'medium', label: 'Medium', count: 7 },
    { value: 'high', label: 'High', count: 3 },
    { value: 'urgent', label: 'Urgent', count: 1 },
  ];

  return (
    <div className="flex flex-wrap items-center gap-3 mb-6 p-4 bg-gray-50 rounded-xl">
      {/* Priority badges */}
      <div className="flex flex-wrap gap-2">
        {priorityBadges.map((badge) => (
          <Badge
            key={badge.value}
            variant={priorityFilter === badge.value ? 'default' : 'secondary'}
            className="cursor-pointer hover:opacity-80 px-3 py-1 text-xs"
            onClick={() => onPriorityChange(badge.value)}
          >
            {badge.label} ({badge.count})
          </Badge>
        ))}
      </div>

      {/* Distance filter */}
      <Select value={distanceFilter} onValueChange={onDistanceChange}>
        <SelectTrigger className="w-[160px] bg-white h-9">
          <SelectValue placeholder="Distance" />
        </SelectTrigger>
        <SelectContent className='bg-white'>
          <SelectItem value="all">All distances</SelectItem>
          <SelectItem value="short">&lt; 5 km</SelectItem>
          <SelectItem value="medium">5-15 km</SelectItem>
          <SelectItem value="long">15+ km</SelectItem>
        </SelectContent>
      </Select>

      <Button variant="ghost" size="sm" className="h-9 text-xs">
        Clear all
      </Button>
    </div>
  );
};
