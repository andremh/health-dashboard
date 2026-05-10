'use client';

import { Button } from '@/components/ui/button';
import { RefreshCw, Activity } from 'lucide-react';

interface DashboardHeaderProps {
  isLoading: boolean;
  onRefresh: () => void;
  message?: { text: string; type: 'success' | 'error' } | null;
}

export function DashboardHeader({ isLoading, onRefresh, message }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-white/10 bg-gray-950/60 backdrop-blur-xl px-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 text-primary rounded-lg">
          <Activity className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Health Dashboard
          </h1>
          <p className="text-xs font-medium text-muted-foreground hidden lg:block uppercase tracking-wider">
            Personal Performance Metrics
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        {message && (
          <span
            className={`text-sm font-medium animate-in fade-in slide-in-from-right-2 duration-300 ${
              message.type === 'success' ? 'text-emerald-400' : 'text-red-400'
            }`}
          >
            {message.text}
          </span>
        )}
        <Button 
          onClick={onRefresh} 
          variant="outline" 
          size="sm"
          disabled={isLoading}
          className="shrink-0 bg-gray-900/50 hover:bg-gray-800 border-white/10 shadow-sm transition-all duration-300"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          <span className="ml-2 hidden sm:inline">Sync Data</span>
        </Button>
      </div>
    </header>
  );
}