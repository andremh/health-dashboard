'use client';

import { HealthMetricsCard } from '@/components/widgets/health-metrics-card';

export default function HealthPage() {
  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-6">Health Metrics</h1>
      <div className="max-w-md mx-auto">
        <HealthMetricsCard />
      </div>
    </div>
  );
}
