'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, Menu, X } from 'lucide-react';
import { DashboardSidebar } from './sidebar';

interface MobileHeaderProps {
  isLoading: boolean;
  onRefresh: () => void;
  onMenuToggle?: (isOpen: boolean) => void;
}

export function MobileHeader({ isLoading, onRefresh, onMenuToggle }: MobileHeaderProps) {
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
      <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b bg-background px-3 md:hidden">
        <div className="flex items-center gap-2 flex-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="h-9 w-9"
          >
            {isMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </Button>
          <div className="min-w-0 flex-1">
            <h1 className="text-base font-semibold truncate">Health</h1>
            <p className="text-xs text-muted-foreground truncate">André</p>
          </div>
        </div>
        <Button
          onClick={onRefresh}
          variant="outline"
          size="icon"
          disabled={isLoading}
          className="shrink-0 h-9 w-9"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
        </Button>
      </header>

      {/* Mobile Menu - overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMenuOpen(false)} />
          <div className="fixed inset-y-0 left-0 z-50">
            <DashboardSidebar onClose={() => setIsMenuOpen(false)} isMobile={true} />
          </div>
        </div>
      )}
    </>
  );
}
