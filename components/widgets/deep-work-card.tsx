'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FocusTime } from '@/types/productivity';
import { useDeepWork } from '@/hooks/use-deep-work';
import { Clock, Target, Activity } from 'lucide-react';

export function DeepWorkCard() {
  const { data, isLoading, error } = useDeepWork();

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Deep Work
          </CardTitle>
          <CardDescription>Error loading focus time data</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">{error.message}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Deep Work
        </CardTitle>
        <CardDescription>Focus time vs Recovery time today</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <p>Loading...</p>
          </div>
        ) : data ? (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium">Focus Time</span>
              </div>
              <span className="text-lg font-bold">{data.focusTime} min</span>
            </div>
            
            <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
              <div 
                className="h-full bg-blue-500" 
                style={{ width: `${Math.min(100, data.focusPercentage)}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">Recovery</span>
              </div>
              <span className="text-lg font-bold">{data.recoveryTime} min</span>
            </div>
            
            <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
              <div 
                className="h-full bg-green-500" 
                style={{ width: `${Math.min(100, data.recoveryPercentage)}%` }}
              ></div>
            </div>
            
            <div className="mt-4 pt-4 border-t">
              <p className="text-sm font-medium">Productivity Score</p>
              <p className="text-2xl font-bold">{data.productivityScore}%</p>
              <p className="text-xs text-muted-foreground mt-1">
                {data.focusTime > data.recoveryTime ? 'High focus day' : 'Balanced day'}
              </p>
            </div>
          </div>
        ) : (
          <p>No data available</p>
        )}
      </CardContent>
    </Card>
  );
}