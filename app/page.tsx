'use client';

import { useState, useEffect } from 'react';
import { DashboardHeader } from '@/components/dashboard/header';
import { MobileHeader } from '@/components/dashboard/mobile-header';
import { DashboardGrid } from '@/components/dashboard/grid';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { useGlobalRefreshEnhanced } from '@/hooks/use-global-refresh-enhanced';
import { ToastNotifications } from '@/components/ui/toast-notifications';

export default function DashboardPage() {
  const { isLoading, handleRefresh } = useGlobalRefreshEnhanced();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Função para lidar com abertura/fechamento do menu mobile
  const handleMobileMenuToggle = (isOpen: boolean) => {
    setIsMobileMenuOpen(isOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardSidebar />
      <main className={`flex-1 overflow-auto transition-all duration-300 ${isMobileMenuOpen ? 'opacity-50' : 'opacity-100'}`}>
        {/* Desktop Header */}
        <div className="hidden md:block">
          <DashboardHeader 
            isLoading={isLoading} 
            onRefresh={handleRefresh} 
          />
        </div>
        {/* Mobile Header com callback para controle do menu */}
        <MobileHeader 
          isLoading={isLoading} 
          onRefresh={handleRefresh}
          onMenuToggle={handleMobileMenuToggle}
        />
        <div className="pb-16 md:pb-0">
          <DashboardGrid />
        </div>
      </main>
      <ToastNotifications />
    </div>
  );
}