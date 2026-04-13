'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RunningActivity } from '@/types/activities';
import { usePhysicalTracking } from '@/hooks/use-physical-tracking';
import { Activity, TrendingUp, Calendar, AlertCircle, AlertTriangle } from 'lucide-react';
import { validateRunningMetrics } from '@/utils/validation';
import { ErrorHandler } from '@/components/error-handler';

export function PhysicalTrackingCardEnhanced() {
  const { data, isLoading, error, isError } = usePhysicalTracking();

  if (isError) {
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
          <p className="text-red-500">{error?.message || 'Unknown error'}</p>
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
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <p>Loading...</p>
          </div>
        ) : data ? (
          <div className="space-y-6">
            {/* Validation Summary */}
            {data.lastWorkout?.distance && data.lastWorkout.duration && data.lastWorkout.calories && (
              <div className="mb-4">
                <ErrorHandler 
                  summary={{
                    isValid: validateRunningMetrics(
                      data.lastWorkout.distance, 
                      data.lastWorkout.duration, 
                      data.lastWorkout.calories
                    ).isValid,
                    errors: validateRunningMetrics(
                      data.lastWorkout.distance, 
                      data.lastWorkout.duration, 
                      data.lastWorkout.calories
                    ).errors.map(msg => ({
                      field: 'Running Metrics',
                      message: msg
                    })),
                    warnings: validateRunningMetrics(
                      data.lastWorkout.distance, 
                      data.lastWorkout.duration, 
                      data.lastWorkout.calories
                    ).warnings?.map(msg => ({
                      field: 'Running Metrics',
                      message: msg
                    })) || []
                  }}
                />
              </div>
            )}

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium">Last Workout</p>
                  <p className="text-lg font-semibold">{data.lastWorkout?.activityType || 'Rest'}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">This Week</p>
                  <p className="text-lg font-semibold">{data.thisWeekWorkouts} workouts</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium">Running</span>
                  </div>
                  <p className="text-2xl font-bold">{data.runningDistance || 0} km</p>
                  <p className="text-xs text-muted-foreground">this week</p>
                </div>
                
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <DumbbellIcon className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-medium">Gym</span>
                  </div>
                  <p className="text-2xl font-bold">{data.gymSessions || 0}</p>
                  <p className="text-xs text-muted-foreground">sessions</p>
                </div>
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