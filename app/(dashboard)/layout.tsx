'use client';

import { ToastNotifications } from '@/components/ui/toast-notifications';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <ToastNotifications />
    </>
  );
}
