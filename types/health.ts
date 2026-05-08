export interface HealthMetric {
  id: string;
  timestamp?: string;
  date?: string;
  heartRate: number; // beats per minute
  temperature: number; // in Celsius
  bloodPressure?: {
    systolic: number;
    diastolic: number;
  };
  oxygenSaturation?: number; // SpO2 percentage
  hydration: number; // percentage
  sleepQuality?: number; // 0-10
  sleepHours: number; // hours
  restingHeartRate?: number;
  heartRateVariability?: number;
  weight?: number; // in kg
  bodyFatPercentage?: number;
  steps?: number; // daily steps
  calories?: number; // daily calories
  source?: string; // data source
}