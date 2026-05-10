'use client';

import { MindsetLogicCard } from '@/components/widgets/mindset-logic-card';

export default function MindsetPage() {
  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-6">Mindset</h1>
      <div className="max-w-md mx-auto">
        <MindsetLogicCard />
      </div>
    </div>
  );
}
