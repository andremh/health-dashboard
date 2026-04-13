'use client';

import { AlertCircle, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface ValidationError {
  field: string;
  message: string;
}

interface ValidationSummary {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationError[];
}

interface ErrorHandlerProps {
  summary: ValidationSummary;
  title?: string;
}

export function ErrorHandler({ summary, title = 'Validation Summary' }: ErrorHandlerProps) {
  if (summary.errors.length === 0 && summary.warnings.length === 0) {
    return (
      <Alert className="bg-green-50 border-green-200">
        <CheckCircle2 className="h-4 w-4 text-green-600" />
        <AlertTitle className="text-green-800">Valid Data</AlertTitle>
        <AlertDescription className="text-green-700">
          All data passed validation successfully.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      {summary.errors.length > 0 && (
        <Alert className="bg-red-50 border-red-200">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertTitle className="text-red-800">Validation Errors</AlertTitle>
          <AlertDescription className="text-red-700">
            <ul className="list-disc pl-5 space-y-1">
              {summary.errors.map((error, index) => (
                <li key={index}>
                  <strong>{error.field}:</strong> {error.message}
                </li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {summary.warnings.length > 0 && (
        <Alert className="bg-yellow-50 border-yellow-200">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertTitle className="text-yellow-800">Validation Warnings</AlertTitle>
          <AlertDescription className="text-yellow-700">
            <ul className="list-disc pl-5 space-y-1">
              {summary.warnings.map((warning, index) => (
                <li key={index}>
                  <strong>{warning.field}:</strong> {warning.message}
                </li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}