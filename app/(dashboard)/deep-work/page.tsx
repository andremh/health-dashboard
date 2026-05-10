'use client';

import { DeepWorkCard } from '@/components/widgets/deep-work-card';

export default function DeepWorkPage() {
  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-6">Deep Work</h1>
      <div className="max-w-md mx-auto">
        <DeepWorkCard />
      </div>
    </div>
  );
}
