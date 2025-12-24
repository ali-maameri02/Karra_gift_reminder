'use client';

import { useState, useEffect } from 'react';
// import { useAuth } from '@/app/providers/AuthProvider';
import { AssignmentsList, AssignmentItem } from '@/widgets/AssignmentsList/ui/AssignmentsList';
import { AssignmentFilters } from '@/widgets/AssignmentFilters/ui/AssignmentFilters';
import { toast } from 'sonner';

const AssignmentsPage = () => {
//   const { userId } = useAuth();
  const [assignments, setAssignments] = useState<AssignmentItem[]>([]);
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [distanceFilter, setDistanceFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  // Fetch assignments from /api/deliveries/assign
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams({
          priority: priorityFilter,
          distance: distanceFilter,
        });
        const response = await fetch(`/api/deliveries/assign?${params}`);
        const data = await response.json();
        setAssignments(data);
      } catch (error) {
        console.error('Failed to fetch assignments:', error);
        toast.error('Failed to load assignments');
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [priorityFilter, distanceFilter, ]);

  const handleAccept = async (assignmentId: string) => {
    try {
      await fetch(`/api/deliveries/assign/${assignmentId}/accept`, {
        method: 'POST',
      });
      setAssignments((prev) =>
        prev.map((a) =>
          a.id === assignmentId
            ? { ...a, priority: 'assigned' as AssignmentItem['priority'] }
            : a
        )
      );
      toast.success('Assignment accepted!');
    } catch (error) {
      toast.error('Failed to accept assignment');
    }
  };

  const handleReject = async (assignmentId: string) => {
    try {
      await fetch(`/api/deliveries/assign/${assignmentId}/reject`, {
        method: 'POST',
      });
      setAssignments((prev) => prev.filter((a) => a.id !== assignmentId));
      toast.success('Assignment rejected');
    } catch (error) {
      toast.error('Failed to reject assignment');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg text-gray-500 animate-pulse">Loading assignments...</div>
      </div>
    );
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">New Assignments</h1>
        <p className="text-xl text-gray-600">
          Review and accept new delivery jobs from vendors
        </p>
      </div>

      {/* Filters */}
      <AssignmentFilters
        priorityFilter={priorityFilter}
        onPriorityChange={setPriorityFilter}
        distanceFilter={distanceFilter}
        onDistanceChange={setDistanceFilter}
      />

      {/* Main list */}
      <AssignmentsList
        assignments={assignments}
        onAccept={handleAccept}
        onReject={handleReject}
      />
    </main>
  );
};

export default AssignmentsPage;
