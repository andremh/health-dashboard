export interface SupplementTracker {
  id: string;
  date: string;
  proteinIntake: number; // in grams
  targetProtein: number; // in grams
  creatineIntake: number; // in grams
  targetCreatine: number; // in grams
  additionalSupplements?: string[];
  notes?: string;
}