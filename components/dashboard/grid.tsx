'use client';

import { PhysicalTrackingCard } from '@/components/widgets/physical-tracking-card';
import { DeepWorkCard } from '@/components/widgets/deep-work-card';
import { MindsetLogicCard } from '@/components/widgets/mindset-logic-card';
import { HealthMetricsCard } from '@/components/widgets/health-metrics-card';
import { TrainingVolumeCard } from '@/components/widgets/training-volume-card';

export function DashboardGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:gap-6 sm:p-6 md:grid-cols-2 xl:grid-cols-3 auto-rows-max">
      <HealthMetricsCard />
      <PhysicalTrackingCard />
      <DeepWorkCard />
      <MindsetLogicCard />
      <TrainingVolumeCard />
    </div>
  );
}
