import { RunningActivity, GymActivity } from '@/types/activities';

const FITNESS_API_BASE_URL = process.env.FITNESS_API_BASE_URL || 'http://localhost:3002/api';

class FitnessService {
  async getRecentActivities(limit: number = 10): Promise<(RunningActivity | GymActivity)[]> {
    try {
      const response = await fetch(`${FITNESS_API_BASE_URL}/activities/recent?limit=${limit}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching recent activities:', error);
      throw error;
    }
  }

  async getWeeklyVolume(): Promise<number> {
    try {
      const response = await fetch(`${FITNESS_API_BASE_URL}/volume/weekly`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.volume;
    } catch (error) {
      console.error('Error fetching weekly volume:', error);
      throw error;
    }
  }

  async createActivity(activity: RunningActivity | GymActivity): Promise<void> {
    try {
      const response = await fetch(`${FITNESS_API_BASE_URL}/activities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(activity),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error creating activity:', error);
      throw error;
    }
  }
}

export const fitnessService = new FitnessService();