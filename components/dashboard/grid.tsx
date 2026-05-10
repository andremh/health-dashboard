'use client';

import { PhysicalTrackingCard } from '@/components/widgets/physical-tracking-card';
import { DeepWorkCard } from '@/components/widgets/deep-work-card';
import { MindsetLogicCard } from '@/components/widgets/mindset-logic-card';
import { HealthMetricsCard } from '@/components/widgets/health-metrics-card';
import { TrainingVolumeCard } from '@/components/widgets/training-volume-card';

export function DashboardGrid() {
  return (
    <div className="grid grid-cols-1 gap-3 p-3 sm:gap-4 sm:p-4 md:gap-6 md:p-6 md:grid-cols-2 lg:grid-cols-3">
      <PhysicalTrackingCard />
      <DeepWorkCard />
      <MindsetLogicCard />
      <HealthMetricsCard />
      <TrainingVolumeCard />
    </div>
  );
}
