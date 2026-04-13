'use client';

import { useErrorHandler } from '@/providers/error-handler-context';
import { AlertCircle, AlertTriangle, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ToastNotifications() {
  const { errors, warnings, dismissError, dismissWarning } = useErrorHandler();
  const [visibleErrors, setVisibleErrors] = useState<string[]>([]);
  const [visibleWarnings, setVisibleWarnings] = useState<string[]>([]);

  useEffect(() => {
    // Add new errors to visible list
    errors.forEach(error => {
      if (!visibleErrors.includes(error.id)) {
        setVisibleErrors(prev => [...prev, error.id]);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
          dismissError(error.id);
          setVisibleErrors(prev => prev.filter(id => id !== error.id));
        }, 5000);
      }
    });

    // Add new warnings to visible list
    warnings.forEach(warning => {
      if (!visibleWarnings.includes(warning.id)) {
        setVisibleWarnings(prev => [...prev, warning.id]);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
          dismissWarning(warning.id);
          setVisibleWarnings(prev => prev.filter(id => id !== warning.id));
        }, 5000);
      }
    });
  }, [errors, warnings, visibleErrors, visibleWarnings, dismissError, dismissWarning]);

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {errors.map(error => (
        visibleErrors.includes(error.id) && (
          <div 
            key={error.id} 
            className="flex items-center gap-3 rounded-lg border bg-background p-4 shadow-lg border-red-200 bg-red-50 max-w-md animate-in slide-in-from-bottom-4 duration-300"
          >
            <AlertCircle className="h-5 w-5 text-red-600" />
            <div className="flex-1">
              <p className="text-sm font-medium text-red-800">Error</p>
              <p className="text-sm text-red-700">{error.message}</p>
              {error.component && (
                <p className="text-xs text-red-600 mt-1">Component: {error.component}</p>
              )}
            </div>
            <button 
              onClick={() => {
                dismissError(error.id);
                setVisibleErrors(prev => prev.filter(id => id !== error.id));
              }} 
              className="text-red-600 hover:text-red-800"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )
      ))}

      {warnings.map(warning => (
        visibleWarnings.includes(warning.id) && (
          <div 
            key={warning.id} 
            className="flex items-center gap-3 rounded-lg border bg-background p-4 shadow-lg border-yellow-200 bg-yellow-50 max-w-md animate-in slide-in-from-bottom-4 duration-300"
          >
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            <div className="flex-1">
              <p className="text-sm font-medium text-yellow-800">Warning</p>
              <p className="text-sm text-yellow-700">{warning.message}</p>
              {warning.component && (
                <p className="text-xs text-yellow-600 mt-1">Component: {warning.component}</p>
              )}
            </div>
            <button 
              onClick={() => {
                dismissWarning(warning.id);
                setVisibleWarnings(prev => prev.filter(id => id !== warning.id));
              }} 
              className="text-yellow-600 hover:text-yellow-800"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )
      ))}
    </div>
  );
}