'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { usePhysicalTracking } from '@/hooks/use-physical-tracking';
import { Activity, TrendingUp, Calendar } from 'lucide-react';

export function PhysicalTrackingCard() {
  const { data, isLoading, error, isRefetching } = usePhysicalTracking();
  const isRefreshing = isRefetching && !!data;

  if (error) {
    return (
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Physical Tracking
          </CardTitle>
          <CardDescription>Error loading physical tracking data</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">{error.message}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Physical Tracking
        </CardTitle>
        <CardDescription>Your training activities and performance metrics</CardDescription>
      </CardHeader>
      <CardContent className={`transition-opacity duration-300 ${isRefreshing ? 'opacity-70' : ''}`}>
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <p>Loading...</p>
          </div>
        ) : data ? (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="min-w-0">
                <p className="text-xs font-medium truncate">Last Workout</p>
                <p className="text-base font-semibold truncate">{data.lastWorkout?.activityType || 'Rest'}</p>
              </div>
              <div className="text-right ml-2">
                <p className="text-xs font-medium">This Week</p>
                <p className="text-base font-semibold">{data.thisWeekWorkouts}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 pt-3 border-t">
              <div className="bg-muted/50 rounded-lg p-2.5">
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-3.5 w-3.5 text-green-500" />
                  <span className="text-xs font-medium">Steps</span>
                </div>
                <p className="text-lg font-bold truncate">{data.steps?.toLocaleString() || 0}</p>
                <p className="text-[0.65rem] text-muted-foreground">today</p>
              </div>
              
              <div className="bg-muted/50 rounded-lg p-2.5">
                <div className="flex items-center gap-1">
                  <DumbbellIcon className="h-3.5 w-3.5 text-blue-500" />
                  <span className="text-xs font-medium">Calories</span>
                </div>
                <p className="text-lg font-bold truncate">{data.calories || 0}</p>
                <p className="text-[0.65rem] text-muted-foreground">burned</p>
              </div>
            </div>
          </div>
        ) : (
          <p>No data available</p>
        )}
      </CardContent>
    </Card>
  );
}

// Dumbbell icon as a component since it's not imported
function DumbbellIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="4" y="8" width="4" height="8"></rect>
      <rect x="16" y="8" width="4" height="8"></rect>
      <rect x="8" y="4" width="8" height="16"></rect>
    </svg>
  );
}