'use client';

import { DashboardHeader } from '@/components/dashboard/header';
import { DashboardGrid } from '@/components/dashboard/grid';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { useGlobalRefreshEnhanced } from '@/hooks/use-global-refresh-enhanced';
import { ToastNotifications } from '@/components/ui/toast-notifications';

export default function DashboardPage() {
  const { isLoading, handleRefresh } = useGlobalRefreshEnhanced();

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
      <ToastNotifications />
    </div>
  );
}