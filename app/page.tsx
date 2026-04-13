'use client';

import { DashboardHeader } from '@/components/dashboard/header';
import { DashboardGrid } from '@/components/dashboard/grid';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { useGlobalRefresh } from '@/hooks/use-global-refresh';

export default function DashboardPage() {
  const { isLoading, handleRefresh } = useGlobalRefresh();

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardSidebar />
      <main className="flex-1 overflow-auto">
        <DashboardHeader 
          isLoading={isLoading} 
          onRefresh={handleRefresh} 
        />
        <DashboardGrid />
      </main>
    </div>
  );
}