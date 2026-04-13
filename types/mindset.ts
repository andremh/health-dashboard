export interface MindsetInsight {
  id: string;
  date: string;
  currentState: string;
  dailyInsight: string;
  emotionalControlLevel: string;
  stressLevel: number; // 0-100
  cognitiveLoad: number; // 0-10
  mood: string;
  notes?: string;
}