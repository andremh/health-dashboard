export interface FocusTime {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number; // in minutes
  activity: string;
  productivityScore: number; // 0-100
  distractionCount?: number;
  notes?: string;
}

export interface DeepWorkSession {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number; // in minutes
  focusArea: string;
  outcome: string;
  energyLevel: number; // 1-10
}