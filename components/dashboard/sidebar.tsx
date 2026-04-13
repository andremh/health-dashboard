'use client';

import Link from 'next/link';
import { Activity, BarChart3, HeartPulse, Brain, Dumbbell, Coffee, Calendar, Settings } from 'lucide-react';

const navItems = [
  { icon: BarChart3, label: 'Overview', href: '/' as const },
  { icon: Activity, label: 'Physical', href: '/physical' as const },
  { icon: HeartPulse, label: 'Health', href: '/health' as const },
  { icon: Brain, label: 'Mindset', href: '/mindset' as const },
  { icon: Dumbbell, label: 'Training', href: '/training' as const },
  { icon: Coffee, label: 'Bio-Fuel', href: '/biofuel' as const },
  { icon: Calendar, label: 'Deep Work', href: '/deep-work' as const },
  { icon: Settings, label: 'Settings', href: '/settings' as const },
];

export function DashboardSidebar() {
  return (
    <aside className="hidden w-64 flex-col border-r bg-background md:flex">
      <div className="flex h-16 items-center border-b px-6">
        <h2 className="text-lg font-semibold">Health</h2>
      </div>
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}