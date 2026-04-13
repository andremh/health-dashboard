'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MindsetInsight } from '@/types/mindset';
import { useMindsetLogic } from '@/hooks/use-mindset-logic';
import { Brain, Eye, MessageSquare, TrendingUp } from 'lucide-react';

export function MindsetLogicCard() {
  const { data, isLoading, error } = useMindsetLogic();

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Mindset Logic
          </CardTitle>
          <CardDescription>Error loading mindset data</CardDescription>
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
          <Brain className="h-5 w-5" />
          Mindset Logic
        </CardTitle>
        <CardDescription>Factual insights and emotional control</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <p>Loading...</p>
          </div>
        ) : data ? (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Eye className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">Current State</p>
                <p className="text-sm">{data.currentState}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <MessageSquare className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">Daily Insight</p>
                <p className="text-sm">{data.dailyInsight}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <TrendingUp className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">Emotional Control</p>
                <p className="text-sm">{data.emotionalControlLevel}</p>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t">
              <p className="text-sm font-medium">Stress Level</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-red-500" 
                    style={{ width: `${data.stressLevel}%` }}
                  ></div>
                </div>
                <span className="text-sm w-10">{data.stressLevel}%</span>
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