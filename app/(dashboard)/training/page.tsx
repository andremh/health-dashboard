'use client';

import { TrainingVolumeCard } from '@/components/widgets/training-volume-card';

export default function TrainingPage() {
  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-6">Training Volume</h1>
      <div className="max-w-md mx-auto">
        <TrainingVolumeCard />
      </div>
    </div>
  );
}
