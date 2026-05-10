'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { HeartPulse, Moon } from 'lucide-react';
import { useHealthMetrics } from '@/hooks/use-health-metrics';
import { useSleepData } from '@/hooks/use-sleep-data';

export function HealthMetricsCard() {
  const { data: healthData, isLoading: healthLoading, error: healthError, isRefetching: healthRefetching } = useHealthMetrics();
  const { data: sleepData, isLoading: sleepLoading, error: sleepError, isRefetching: sleepRefetching } = useSleepData();
  const isRefreshing = healthRefetching || sleepRefetching;

  if (healthError || sleepError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HeartPulse className="h-5 w-5" />
            Health Metrics
          </CardTitle>
          <CardDescription>Error loading health data</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">{healthError?.message || sleepError?.message}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HeartPulse className="h-5 w-5" />
          Health Metrics
        </CardTitle>
        <CardDescription>Real-time health indicators</CardDescription>
      </CardHeader>
      <CardContent className={isRefreshing ? 'opacity-70 transition-opacity duration-300' : ''}>
        {(healthLoading || sleepLoading) ? (
          <div className="flex justify-center items-center h-32">
            <p>Loading...</p>
          </div>
        ) : healthData ? (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-muted/50 rounded-lg p-2.5">
                <div className="flex items-center gap-1 mb-1">
                  <HeartPulse className="h-3.5 w-3.5 text-red-500" />
                  <span className="text-xs font-medium">HR</span>
                </div>
                <p className="text-lg font-bold">{healthData.heartRate ?? '—'}</p>
                <p className="text-[0.65rem] text-muted-foreground">bpm</p>
              </div>

              <div className="bg-muted/50 rounded-lg p-2.5">
                <div className="flex items-center gap-1 mb-1">
                  <Moon className="h-3.5 w-3.5 text-indigo-500" />
                  <span className="text-xs font-medium">Sleep</span>
                </div>
                <p className="text-lg font-bold">{sleepData?.duration || healthData.sleepHours || '—'}h</p>
                <p className="text-[0.65rem] text-muted-foreground">last night</p>
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-2.5">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium">Steps</span>
                <span className="text-lg font-bold">{healthData.steps?.toLocaleString() || '—'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium">Calories</span>
                <span className="text-sm font-semibold">{healthData.calories || '—'}</span>
              </div>
            </div>
          </div>
        ) : (
          <p>No data available</p>
        )}
        {healthData?.source && (
          <div className="mt-3 pt-2 border-t text-[0.65rem] text-muted-foreground uppercase tracking-wider">
            Source: {healthData.source}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
