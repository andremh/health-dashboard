'use client';

import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface DashboardHeaderProps {
  isLoading: boolean;
  onRefresh: () => void;
}

export function DashboardHeader({ isLoading, onRefresh }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background px-6">
      <div className="flex-1">
        <h1 className="text-xl font-semibold">Health Dashboard</h1>
        <p className="text-sm text-muted-foreground hidden lg:block">
          André Moura Henriques - Personal Performance Metrics
        </p>
      </div>
      <Button 
        onClick={onRefresh} 
        variant="outline" 
        size="sm"
        disabled={isLoading}
        className="shrink-0"
      >
        <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
        <span className="ml-2 hidden sm:inline">Global Refresh</span>
      </Button>
    </header>
  );
}