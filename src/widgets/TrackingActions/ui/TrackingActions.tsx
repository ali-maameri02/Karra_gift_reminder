'use client';

import { CheckCircle, Pause, RotateCcw, MessageCircle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface TrackingActionsProps {
  onMarkComplete: () => void;
  onPause: () => void;
  progress: number;
}

export const TrackingActions: React.FC<TrackingActionsProps> = ({
  onMarkComplete,
  onPause,
  progress,
}) => {
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-6 space-y-4">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Delivery Progress</span>
            <Badge className="bg-emerald-100 text-emerald-800">{Math.round(progress)}%</Badge>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Main actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            size="lg"
            className="h-14 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white shadow-lg font-semibold"
            onClick={onMarkComplete}
          >
            <CheckCircle className="h-5 w-5 mr-2" />
            Mark Complete
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-14 border-2 border-orange-200 hover:bg-orange-50"
            onClick={onPause}
          >
            <Pause className="h-5 w-5 mr-2" />
            Pause Delivery
          </Button>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-4 border-t">
          <Button variant="ghost" size="sm" className="justify-start h-10">
            <RotateCcw className="h-4 w-4 mr-2" />
            Re-route
          </Button>
          <Button variant="ghost" size="sm" className="justify-start h-10">
            <MessageCircle className="h-4 w-4 mr-2" />
            Add note
          </Button>
          <Button variant="ghost" size="sm" className="justify-start h-10">
            <Phone className="h-4 w-4 mr-2" />
            Call support
          </Button>
          <Button variant="ghost" size="sm" className="justify-start h-10">
            📞 Call customer
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
