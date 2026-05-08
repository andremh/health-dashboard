'use client';

import { DashboardHeader } from '@/components/dashboard/header';
import { MobileHeader } from '@/components/dashboard/mobile-header';
import { useGlobalRefreshEnhanced } from '@/hooks/use-global-refresh-enhanced';

export default function SettingsPage() {
  const { isLoading, handleRefresh } = useGlobalRefreshEnhanced();

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <main className="flex-1 overflow-auto">
        <div className="hidden md:block">
          <DashboardHeader isLoading={isLoading} onRefresh={handleRefresh} />
        </div>
        <MobileHeader isLoading={isLoading} onRefresh={handleRefresh} />
        <div className="p-4 md:p-6 max-w-2xl">
          <h1 className="text-2xl font-bold mb-6">Settings</h1>
          
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <h2 className="text-lg font-semibold mb-2">Data Source</h2>
              <p className="text-muted-foreground text-sm mb-4">
                Current data is fetched from Fitbit via OpenClaw integration.
              </p>
              <div className="flex items-center gap-2 text-sm">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span>Fitbit connected</span>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <h2 className="text-lg font-semibold mb-2">Last Updated</h2>
              <p className="text-muted-foreground text-sm">
                Data is refreshed on each build/deploy.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <h2 className="text-lg font-semibold mb-2">Version</h2>
              <p className="text-muted-foreground text-sm">
                Health Dashboard v0.1.0
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
