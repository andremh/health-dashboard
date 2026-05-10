'use client';

import { BioFuelCard } from '@/components/widgets/bio-fuel-card';

export default function BioFuelPage() {
  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-6">Bio-Fuel</h1>
      <div className="max-w-md mx-auto">
        <BioFuelCard />
      </div>
    </div>
  );
}
