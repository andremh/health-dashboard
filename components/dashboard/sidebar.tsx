'use client';

import Link from 'next/link';
import type { UrlObject } from 'url';
import { Activity, BarChart3, HeartPulse, Brain, Dumbbell, Coffee, Calendar, Settings } from 'lucide-react';

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
                href={item.href as unknown as UrlObject}
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