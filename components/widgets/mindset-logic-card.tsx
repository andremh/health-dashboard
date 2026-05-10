'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useMindsetLogic } from '@/hooks/use-mindset-logic';
import { Brain, Eye, MessageSquare, TrendingUp } from 'lucide-react';

export function MindsetLogicCard() {
  const { data, isLoading, error, isRefetching } = useMindsetLogic();
  const isRefreshing = isRefetching && !!data;

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
      <CardContent className={`transition-opacity duration-300 ${isRefreshing ? 'opacity-70' : ''}`}>
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <p>Loading...</p>
          </div>
        ) : data ? (
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <Eye className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium">Current State</p>
                <p className="text-xs truncate">{data.currentState}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <MessageSquare className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium">Daily Insight</p>
                <p className="text-xs truncate">{data.dailyInsight}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <TrendingUp className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium">Emotional Control</p>
                <p className="text-xs truncate">{data.emotionalControlLevel}</p>
              </div>
            </div>
            
            <div className="mt-3 pt-3 border-t">
              <p className="text-xs font-medium">Stress Level</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-red-500" 
                    style={{ width: `${data.stressLevel}%` }}
                  ></div>
                </div>
                <span className="text-xs w-8">{data.stressLevel}%</span>
              </div>
            </div>
          </div>
        ) : (
          <p>No data available</p>
        )}
        {data && (
          <div className="mt-3 pt-3 border-t">
            <p className="text-[0.65rem] text-muted-foreground uppercase tracking-wider">Source: {data.source || 'API'}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}