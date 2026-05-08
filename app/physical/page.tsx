'use client';

import { DashboardHeader } from '@/components/dashboard/header';
import { MobileHeader } from '@/components/dashboard/mobile-header';
import { PhysicalTrackingCard } from '@/components/widgets/physical-tracking-card';
import { useGlobalRefreshEnhanced } from '@/hooks/use-global-refresh-enhanced';

export default function PhysicalPage() {
  const { isLoading, handleRefresh } = useGlobalRefreshEnhanced();

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <main className="flex-1 overflow-auto">
        <div className="hidden md:block">
          <DashboardHeader isLoading={isLoading} onRefresh={handleRefresh} />
        </div>
        <MobileHeader isLoading={isLoading} onRefresh={handleRefresh} />
        <div className="p-4 md:p-6">
          <h1 className="text-2xl font-bold mb-6">Physical Activity</h1>
          <div className="max-w-md mx-auto">
            <PhysicalTrackingCard />
          </div>
        </div>
      </main>
    </div>
  );
}
