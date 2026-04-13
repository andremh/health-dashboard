export interface TrainingVolume {
  id: string;
  week: string; // YYYY-WW format
  totalVolume: number; // arbitrary units (weight * reps * sets)
  runningVolume: number;
  gymVolume: number;
  volumeTrend: 'increasing' | 'decreasing' | 'stable';
  trainingLoad: number; // RPE * duration
  recoveryIndex: number; // 0-10 scale
  notes?: string;
}