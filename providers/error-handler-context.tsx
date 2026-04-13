'use client';

import { createContext, useContext, ReactNode, useState } from 'react';

interface ErrorHandlerContextType {
  errors: Array<{ id: string; message: string; timestamp: Date; component?: string }>;
  warnings: Array<{ id: string; message: string; timestamp: Date; component?: string }>;
  addError: (message: string, component?: string) => void;
  addWarning: (message: string, component?: string) => void;
  clearErrors: () => void;
  clearWarnings: () => void;
  dismissError: (id: string) => void;
  dismissWarning: (id: string) => void;
}

const ErrorHandlerContext = createContext<ErrorHandlerContextType | undefined>(undefined);

export function ErrorHandlingProvider({ children }: { children: ReactNode }) {
  const [errors, setErrors] = useState<Array<{ id: string; message: string; timestamp: Date; component?: string }>>([]);
  const [warnings, setWarnings] = useState<Array<{ id: string; message: string; timestamp: Date; component?: string }>>([]);

  const addError = (message: string, component?: string) => {
    const newError = {
      id: Math.random().toString(36).substring(7),
      message,
      timestamp: new Date(),
      component
    };
    setErrors(prev => [...prev, newError]);
    
    // Auto-remove error after 10 seconds
    setTimeout(() => {
      dismissError(newError.id);
    }, 10000);
  };

  const addWarning = (message: string, component?: string) => {
    const newWarning = {
      id: Math.random().toString(36).substring(7),
      message,
      timestamp: new Date(),
      component
    };
    setWarnings(prev => [...prev, newWarning]);
    
    // Auto-remove warning after 10 seconds
    setTimeout(() => {
      dismissWarning(newWarning.id);
    }, 10000);
  };

  const clearErrors = () => setErrors([]);
  const clearWarnings = () => setWarnings([]);

  const dismissError = (id: string) => {
    setErrors(prev => prev.filter(error => error.id !== id));
  };

  const dismissWarning = (id: string) => {
    setWarnings(prev => prev.filter(warning => warning.id !== id));
  };

  return (
    <ErrorHandlerContext.Provider
      value={{
        errors,
        warnings,
        addError,
        addWarning,
        clearErrors,
        clearWarnings,
        dismissError,
        dismissWarning
      }}
    >
      {children}
    </ErrorHandlerContext.Provider>
  );
}

export function useErrorHandler() {
  const context = useContext(ErrorHandlerContext);
  if (context === undefined) {
    throw new Error('useErrorHandler must be used within an ErrorHandlingProvider');
  }
  return context;
}