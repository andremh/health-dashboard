'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { HeartPulse, Thermometer, Droplets, Moon } from 'lucide-react';
import { useHealthMetrics } from '@/hooks/use-health-metrics';
import { useSleepData } from '@/hooks/use-sleep-data';

export function HealthMetricsCard() {
  const { data: healthData, isLoading: healthLoading, error: healthError } = useHealthMetrics();
  const { data: sleepData, isLoading: sleepLoading, error: sleepError } = useSleepData();

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
      <CardContent>
        {(healthLoading || sleepLoading) ? (
          <div className="flex justify-center items-center h-32">
            <p>Loading...</p>
          </div>
        ) : healthData ? (
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted/50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <HeartPulse className="h-4 w-4 text-red-500" />
                <span className="text-sm font-medium">HR</span>
              </div>
              <p className="text-xl font-bold">{healthData.heartRate} bpm</p>
              <p className="text-xs text-muted-foreground">resting</p>
            </div>
            
            <div className="bg-muted/50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Thermometer className="h-4 w-4 text-orange-500" />
                <span className="text-sm font-medium">Temp</span>
              </div>
              <p className="text-xl font-bold">{healthData.temperature}°C</p>
              <p className="text-xs text-muted-foreground">body</p>
            </div>
            
            <div className="bg-muted/50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Droplets className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium">Hydration</span>
              </div>
              <p className="text-xl font-bold">{healthData.hydration}%</p>
              <p className="text-xs text-muted-foreground">optimal</p>
            </div>
            
            <div className="bg-muted/50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Moon className="h-4 w-4 text-indigo-500" />
                <span className="text-sm font-medium">Sleep</span>
              </div>
              <p className="text-xl font-bold">{sleepData?.duration || healthData.sleepHours}h</p>
              <p className="text-xs text-muted-foreground">quality</p>
            </div>
          </div>
        ) : (
          <p>No data available</p>
        )}
      </CardContent>
    </Card>
  );
}