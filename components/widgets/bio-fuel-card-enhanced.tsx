'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SupplementTracker } from '@/types/supplements';
import { useBioFuel } from '@/hooks/use-bio-fuel';
import { Pill, CheckCircle, XCircle, Calendar, AlertCircle, AlertTriangle } from 'lucide-react';
import { validateSupplementData } from '@/utils/validation';
import { ErrorHandler } from '@/components/error-handler';

export function BioFuelCardEnhanced() {
  const { data, isLoading, error, isError } = useBioFuel();

  if (isError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Pill className="h-5 w-5" />
            Bio-Fuel Tracker
          </CardTitle>
          <CardDescription>Error loading supplement data</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">{error?.message || 'Unknown error'}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Pill className="h-5 w-5" />
          Bio-Fuel Tracker
        </CardTitle>
        <CardDescription>Today's supplement intake (Target: 30g Protein, 3g Creatine)</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <p>Loading...</p>
          </div>
        ) : data ? (
          <div className="space-y-6">
            {/* Validation Summary */}
            <div className="mb-4">
              <ErrorHandler 
                summary={{
                  isValid: validateSupplementData(data.proteinIntake, data.creatineIntake).isValid,
                  errors: validateSupplementData(data.proteinIntake, data.creatineIntake).errors.map(msg => ({
                    field: 'Supplements',
                    message: msg
                  })),
                  warnings: validateSupplementData(data.proteinIntake, data.creatineIntake).warnings?.map(msg => ({
                    field: 'Supplements',
                    message: msg
                  })) || []
                }}
              />
            </div>

            {/* Protein Progress */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Protein</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">{data.proteinIntake}g / 30g</span>
                  {data.proteinIntake >= 30 ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
              </div>
              
              <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
                <div 
                  className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600" 
                  style={{ width: `${Math.min(100, (data.proteinIntake / 30) * 100)}%` }}
                ></div>
              </div>
            </div>
            
            {/* Creatine Progress */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Creatine</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">{data.creatineIntake}g / 3g</span>
                  {data.creatineIntake >= 3 ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
              </div>
              
              <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
                <div 
                  className="h-3 rounded-full bg-gradient-to-r from-purple-500 to-purple-600" 
                  style={{ width: `${Math.min(100, (data.creatineIntake / 3) * 100)}%` }}
                ></div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t">
              <p className="text-sm font-medium">Last Updated</p>
              <p className="text-sm text-muted-foreground">{data.lastUpdated}</p>
            </div>
          </div>
        ) : (
          <p>No data available</p>
        )}
      </CardContent>
    </Card>
  );
}