'use client';

import { useState } from 'react';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { DashboardHeader } from '@/components/dashboard/header';
import { MobileHeader } from '@/components/dashboard/mobile-header';
import { useGlobalRefresh } from '@/hooks/use-global-refresh';
import { ToastNotifications } from '@/components/ui/toast-notifications';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading, message, handleRefresh } = useGlobalRefresh();

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardSidebar />
      <main className="flex-1 overflow-auto md:pl-56">
        <div className="hidden md:block">
          <DashboardHeader isLoading={isLoading} onRefresh={handleRefresh} message={message} />
        </div>
        <MobileHeader isLoading={isLoading} onRefresh={handleRefresh} message={message} />
        <div className="pb-16 md:pb-0">
          {children}
        </div>
      </main>
      <ToastNotifications />
    </div>
  );
}
