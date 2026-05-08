'use client';

import { DashboardHeader } from '@/components/dashboard/header';
import { MobileHeader } from '@/components/dashboard/mobile-header';
import { DeepWorkCard } from '@/components/widgets/deep-work-card';
import { useGlobalRefreshEnhanced } from '@/hooks/use-global-refresh-enhanced';

export default function DeepWorkPage() {
  const { isLoading, handleRefresh } = useGlobalRefreshEnhanced();

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <main className="flex-1 overflow-auto">
        <div className="hidden md:block">
          <DashboardHeader isLoading={isLoading} onRefresh={handleRefresh} />
        </div>
        <MobileHeader isLoading={isLoading} onRefresh={handleRefresh} />
        <div className="p-4 md:p-6">
          <h1 className="text-2xl font-bold mb-6">Deep Work</h1>
          <div className="max-w-md mx-auto">
            <DeepWorkCard />
          </div>
        </div>
      </main>
    </div>
  );
}
