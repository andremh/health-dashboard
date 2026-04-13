'use client';

import { PhysicalTrackingCard } from '@/components/widgets/physical-tracking-card';
import { BioFuelCard } from '@/components/widgets/bio-fuel-card';
import { DeepWorkCard } from '@/components/widgets/deep-work-card';
import { MindsetLogicCard } from '@/components/widgets/mindset-logic-card';
import { HealthMetricsCard } from '@/components/widgets/health-metrics-card';
import { TrainingVolumeCard } from '@/components/widgets/training-volume-card';

export function DashboardGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
      <PhysicalTrackingCard />
      <BioFuelCard />
      <DeepWorkCard />
      <MindsetLogicCard />
      <HealthMetricsCard />
      <TrainingVolumeCard />
    </div>
  );
}