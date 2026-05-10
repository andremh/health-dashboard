'use client';

import { PhysicalTrackingCard } from '@/components/widgets/physical-tracking-card';

export default function PhysicalPage() {
  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-6">Physical Activity</h1>
      <div className="max-w-md mx-auto">
        <PhysicalTrackingCard />
      </div>
    </div>
  );
}
