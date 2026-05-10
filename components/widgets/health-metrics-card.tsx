'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { HeartPulse, Thermometer, Droplets, Moon } from 'lucide-react';
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
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-muted/50 rounded-lg p-2.5">
              <div className="flex items-center gap-1 mb-1">
                <HeartPulse className="h-3.5 w-3.5 text-red-500" />
                <span className="text-xs font-medium">HR</span>
              </div>
              <p className="text-lg font-bold">{healthData.heartRate}</p>
              <p className="text-[0.65rem] text-muted-foreground">bpm</p>
            </div>
            
            <div className="bg-muted/50 rounded-lg p-2.5">
              <div className="flex items-center gap-1 mb-1">
                <Thermometer className="h-3.5 w-3.5 text-orange-500" />
                <span className="text-xs font-medium">Temp</span>
              </div>
              <p className="text-lg font-bold">{healthData.temperature}</p>
              <p className="text-[0.65rem] text-muted-foreground">°C</p>
            </div>
            
            <div className="bg-muted/50 rounded-lg p-2.5">
              <div className="flex items-center gap-1 mb-1">
                <Droplets className="h-3.5 w-3.5 text-blue-500" />
                <span className="text-xs font-medium">H2O</span>
              </div>
              <p className="text-lg font-bold">{healthData.hydration}%</p>
              <p className="text-[0.65rem] text-muted-foreground">optimal</p>
            </div>
            
            <div className="bg-muted/50 rounded-lg p-2.5">
              <div className="flex items-center gap-1 mb-1">
                <Moon className="h-3.5 w-3.5 text-indigo-500" />
                <span className="text-xs font-medium">Sleep</span>
              </div>
              <p className="text-lg font-bold">{sleepData?.duration || healthData.sleepHours}h</p>
              <p className="text-[0.65rem] text-muted-foreground">quality</p>
            </div>
          </div>
        ) : (
          <p>No data available</p>
        )}
        {healthData && (
          <div className="mt-3 pt-3 border-t">
            <p className="text-[0.65rem] text-muted-foreground uppercase tracking-wider">Source: {healthData.source || 'API'}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}