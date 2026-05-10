'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { UrlObject } from 'url';
import { Activity, BarChart3, HeartPulse, Brain, Dumbbell, Calendar, Settings, X, Command } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { icon: BarChart3, label: 'Overview', href: '/' },
  { icon: Activity, label: 'Physical', href: '/physical' },
  { icon: HeartPulse, label: 'Health', href: '/health' },
  { icon: Brain, label: 'Mindset', href: '/mindset' },
  { icon: Dumbbell, label: 'Training', href: '/training' },
  { icon: Calendar, label: 'Deep Work', href: '/deep-work' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

interface DashboardSidebarProps {
  onClose?: () => void;
  isMobile?: boolean;
}

export function DashboardSidebar({ onClose, isMobile = false }: DashboardSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className={`fixed inset-y-0 left-0 z-40 w-64 flex-col border-r border-white/10 bg-gray-950/95 backdrop-blur-md shadow-2xl transition-transform duration-300 md:relative md:z-auto md:shadow-none ${isMobile ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
      <div className="flex h-16 items-center px-6">
        <h2 className="text-lg font-bold flex items-center gap-2 text-white">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Command className="h-4 w-4 text-primary-foreground" />
          </div>
          Bio-OS
          {onClose && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="ml-auto md:hidden text-gray-400 hover:text-white hover:bg-white/10"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </h2>
      </div>
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-1.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.label}>
                <Link
                  href={item.href as unknown as UrlObject}
                  onClick={() => {
                    if (onClose) onClose();
                  }}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-200 ${
                    isActive 
                      ? 'bg-primary/10 text-primary font-medium shadow-sm' 
                      : 'text-gray-400 hover:text-gray-100 hover:bg-white/5'
                  }`}
                >
                  <item.icon className={`h-4 w-4 ${isActive ? 'text-primary' : ''}`} />
                  <span className="text-sm">{item.label}</span>
                  {isActive && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="p-4 mt-auto">
        <div className="rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 p-4 border border-white/5 shadow-inner">
          <p className="text-xs font-semibold text-gray-300">System Status</p>
          <div className="mt-2 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs text-emerald-500 font-medium">All APIs Operational</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
