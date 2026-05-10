'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Activity, BarChart3, HeartPulse, Brain, Dumbbell, Coffee, Calendar, Settings, X } from 'lucide-react';
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
  { icon: Coffee, label: 'Bio-Fuel', href: '/biofuel' },
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
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-40 w-56 flex-col border-r bg-background shadow-lg transition-transform duration-300 md:relative md:z-auto md:shadow-none',
        isMobile ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      )}
    >
      <div className="flex h-16 items-center border-b px-6">
        <h2 className="text-lg font-semibold flex items-center">
          <HeartPulse className="h-5 w-5 mr-2 text-primary" />
          Health
          {onClose && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="ml-auto md:hidden"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </h2>
      </div>
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => onClose?.()}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  )}
                >
                  <item.icon className={cn('h-5 w-5', isActive && 'text-primary')} />
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
