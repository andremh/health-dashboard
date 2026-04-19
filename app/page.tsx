'use client';

import { DashboardHeader } from '@/components/dashboard/header';
import { MobileHeader } from '@/components/dashboard/mobile-header';
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
        {/* Desktop Header */}
        <div className="hidden md:block">
          <DashboardHeader 
            isLoading={isLoading} 
            onRefresh={handleRefresh} 
          />
        </div>
        {/* Mobile Header */}
        <MobileHeader 
          isLoading={isLoading} 
          onRefresh={handleRefresh} 
        />
        <div className="pb-16 md:pb-0">
          <DashboardGrid />
        </div>
      </main>
      <ToastNotifications />
    </div>
  );
}