'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-blue-500" />
                <span className="text-xs font-medium">Focus</span>
              </div>
              <span className="text-base font-bold">{data.focusTime}m</span>
            </div>
            
            <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
              <div 
                className="h-full bg-blue-500" 
                style={{ width: `${Math.min(100, data.focusPercentage)}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-green-500" />
                <span className="text-xs font-medium">Recov</span>
              </div>
              <span className="text-base font-bold">{data.recoveryTime}m</span>
            </div>
            
            <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
              <div 
                className="h-full bg-green-500" 
                style={{ width: `${Math.min(100, data.recoveryPercentage)}%` }}
              ></div>
            </div>
            
            <div className="mt-3 pt-3 border-t">
              <p className="text-xs font-medium">Prod. Score</p>
              <p className="text-xl font-bold">{data.productivityScore}%</p>
              <p className="text-[0.65rem] text-muted-foreground mt-1 truncate">
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