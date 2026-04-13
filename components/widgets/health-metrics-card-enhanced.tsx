'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { HealthMetric } from '@/types/health';
import { useHealthMetrics } from '@/hooks/use-health-metrics';
import { HeartPulse, Thermometer, Droplets, Moon, AlertCircle, AlertTriangle } from 'lucide-react';
import { validateHealthMetrics } from '@/utils/validation';
import { ErrorHandler } from '@/components/error-handler';

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
          <div className="space-y-6">
            {/* Validation Summary */}
            <div className="mb-4">
              <ErrorHandler 
                summary={{
                  isValid: validateHealthMetrics(data.heartRate, data.temperature, data.hydration, data.sleepHours).isValid,
                  errors: validateHealthMetrics(data.heartRate, data.temperature, data.hydration, data.sleepHours).errors.map(msg => ({
                    field: 'Health Metrics',
                    message: msg
                  })),
                  warnings: validateHealthMetrics(data.heartRate, data.temperature, data.hydration, data.sleepHours).warnings?.map(msg => ({
                    field: 'Health Metrics',
                    message: msg
                  })) || []
                }}
              />
            </div>

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
                  <Thermometer className="h-4 w-4 text-orange-500" />
                  <span className="text-sm font-medium">Temp</span>
                </div>
                <p className="text-xl font-bold">{data.temperature}°C</p>
                <p className="text-xs text-muted-foreground">body</p>
              </div>
              
              <div className="bg-muted/50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Droplets className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">Hydration</span>
                </div>
                <p className="text-xl font-bold">{data.hydration}%</p>
                <p className="text-xs text-muted-foreground">optimal</p>
              </div>
              
              <div className="bg-muted/50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Moon className="h-4 w-4 text-indigo-500" />
                  <span className="text-sm font-medium">Sleep</span>
                </div>
                <p className="text-xl font-bold">{data.sleepHours}h</p>
                <p className="text-xs text-muted-foreground">quality</p>
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