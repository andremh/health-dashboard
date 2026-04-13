export interface RunningActivity {
  id: string;
  date: string;
  activityType: 'Running' | 'Gym' | 'Swimming' | 'Cycling';
  duration: number; // in minutes
  distance?: number; // in km
  calories: number;
  heartRateAvg?: number;
  notes?: string;
}

export interface GymActivity {
  id: string;
  date: string;
  exercise: string;
  sets: number;
  reps: number;
  weight: number; // in kg
  duration: number; // in minutes
  calories: number;
}