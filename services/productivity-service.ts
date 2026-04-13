import { FocusTime, DeepWorkSession } from '@/types/productivity';

const PRODUCTIVITY_API_BASE_URL = process.env.PRODUCTIVITY_API_BASE_URL || 'http://localhost:3003/api';

class ProductivityService {
  async getFocusTimeToday(): Promise<FocusTime[]> {
    try {
      const response = await fetch(`${PRODUCTIVITY_API_BASE_URL}/focus-time/today`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching focus time:', error);
      throw error;
    }
  }

  async getDeepWorkSessions(date: string): Promise<DeepWorkSession[]> {
    try {
      const response = await fetch(`${PRODUCTIVITY_API_BASE_URL}/deep-work?date=${date}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching deep work sessions:', error);
      throw error;
    }
  }

  async logFocusTime(focusTime: FocusTime): Promise<void> {
    try {
      const response = await fetch(`${PRODUCTIVITY_API_BASE_URL}/focus-time`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(focusTime),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error logging focus time:', error);
      throw error;
    }
  }
}

export const productivityService = new ProductivityService();