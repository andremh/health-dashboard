'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTrainingVolume } from '@/hooks/use-training-volume';
import { Dumbbell, TrendingUp, Calendar } from 'lucide-react';

export function TrainingVolumeCard() {
  const { data, isLoading, error } = useTrainingVolume();

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Dumbbell className="h-5 w-5" />
            Training Volume
          </CardTitle>
          <CardDescription>Error loading training volume data</CardDescription>
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
          <Dumbbell className="h-5 w-5" />
          Training Volume
        </CardTitle>
        <CardDescription>Weekly training load progression</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <p>Loading...</p>
          </div>
        ) : data ? (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium">This Week</span>
              <span className="text-base font-bold">{data.thisWeekVolume}u</span>
            </div>
            
            <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
              <div 
                className="h-1.5 bg-gradient-to-r from-blue-500 to-purple-500" 
                style={{ width: `${Math.min(100, (data.thisWeekVolume / data.maxWeeklyVolume) * 100)}%` }}
              ></div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 pt-3 border-t">
              <div>
                <p className="text-xs text-muted-foreground">Last Week</p>
                <p className="text-sm font-semibold">{data.lastWeekVolume}u</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Avg. Week</p>
                <p className="text-sm font-semibold">{data.avgWeeklyVolume}u</p>
              </div>
            </div>
            
            <div className="flex items-center gap-1.5 mt-3">
              <TrendingUp className="h-3.5 w-3.5 text-green-500" />
              <span className="text-xs">
                {data.volumeTrend === 'increasing' ? '↑ Inc. vol.' : 
                 data.volumeTrend === 'decreasing' ? '↓ Dec. vol.' : 
                 '→ Stable vol.'}
              </span>
            </div>
          </div>
        ) : (
          <p>No data available</p>
        )}
      </CardContent>
    </Card>
  );
}