'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { HealthMetric } from '@/types/health';
import { useHealthMetrics } from '@/hooks/use-health-metrics';
import { HeartPulse, Moon } from 'lucide-react';

export function HealthMetricsCardEnhanced() {
  const { data, isLoading, error, isError } = useHealthMetrics();

  if (isError) {
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
          <p className="text-red-500">{error?.message || 'Unknown error'}</p>
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
        <CardDescription>Real-time health indicators with validation</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <p>Loading...</p>
          </div>
        ) : data ? (
          <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted/50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <HeartPulse className="h-4 w-4 text-red-500" />
                  <span className="text-sm font-medium">HR</span>
                </div>
                <p className="text-xl font-bold">{data.heartRate} bpm</p>
                <p className="text-xs text-muted-foreground">resting</p>
              </div>
              
              <div className="bg-muted/50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Moon className="h-4 w-4 text-indigo-500" />
                  <span className="text-sm font-medium">Sleep</span>
                </div>
                <p className="text-xl font-bold">{data.sleepHours}h</p>
                <p className="text-xs text-muted-foreground">last night</p>
              </div>
              
              <div className="bg-muted/50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium">👟</span>
                  <span className="text-sm font-medium">Steps</span>
                </div>
                <p className="text-xl font-bold">{data.steps.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">today</p>
              </div>
              
              <div className="bg-muted/50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium">🔥</span>
                  <span className="text-sm font-medium">Calories</span>
                </div>
                <p className="text-xl font-bold">{data.calories.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">active kcal</p>
              </div>
            </div>
        ) : (
          <p>No data available</p>
        )}
      </CardContent>
    </Card>
  );
}