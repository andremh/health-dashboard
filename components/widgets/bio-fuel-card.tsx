'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SupplementTracker } from '@/types/supplements';
import { useBioFuel } from '@/hooks/use-bio-fuel';
import { Pill, CheckCircle, XCircle, Calendar } from 'lucide-react';

export function BioFuelCard() {
  const { data, isLoading, error } = useBioFuel();

  if (error) {
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
          <p className="text-red-500">{error.message}</p>
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
          <div className="flex justify-center items-center h-32">
            <p>Loading...</p>
          </div>
        ) : data ? (
          <div className="space-y-4">
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
            
            <div className="h-2 w-full rounded-full bg-muted">
              <div 
                className="h-2 rounded-full bg-blue-500" 
                style={{ width: `${Math.min(100, (data.proteinIntake / 30) * 100)}%` }}
              ></div>
            </div>
            
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
            
            <div className="h-2 w-full rounded-full bg-muted">
              <div 
                className="h-2 rounded-full bg-purple-500" 
                style={{ width: `${Math.min(100, (data.creatineIntake / 3) * 100)}%` }}
              ></div>
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