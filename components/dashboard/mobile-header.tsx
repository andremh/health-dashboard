'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, Menu, X, Command } from 'lucide-react';
import { DashboardSidebar } from './sidebar';

interface MobileHeaderProps {
  isLoading: boolean;
  onRefresh: () => void;
  onMenuToggle?: (isOpen: boolean) => void;
  message?: { text: string; type: 'success' | 'error' } | null;
}

export function MobileHeader({ isLoading, onRefresh, onMenuToggle, message }: MobileHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar se está em mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Notificar o componente pai sobre mudança de estado do menu
  useEffect(() => {
    if (onMenuToggle) {
      onMenuToggle(isMenuOpen);
    }
  }, [isMenuOpen, onMenuToggle]);

  if (!isMobile) {
    return null;
  }

  return (
    <>
      {/* Mobile Header */}
      <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-white/10 bg-gray-950/80 backdrop-blur-xl px-3 md:hidden">
        <div className="flex items-center gap-3 flex-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="h-9 w-9 text-gray-400 hover:text-white hover:bg-white/10"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-primary">
              <Command className="h-3 w-3 text-primary-foreground" />
            </div>
            <h1 className="text-base font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent truncate">
              Bio-OS
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {message && (
            <span className={`text-xs font-medium ${message.type === 'success' ? 'text-emerald-400' : 'text-red-400'}`}>
              {message.text}
            </span>
          )}
          <Button
            onClick={onRefresh}
            variant="outline"
            size="icon"
            disabled={isLoading}
            className="shrink-0 h-8 w-8 bg-gray-900/50 border-white/10"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </header>

      {/* Mobile Menu - overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setIsMenuOpen(false)} />
          <div className="fixed inset-y-0 left-0 z-50">
            <DashboardSidebar onClose={() => setIsMenuOpen(false)} isMobile={true} />
          </div>
        </div>
      )}
    </>
  );
}
