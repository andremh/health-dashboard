import { HealthMetric } from '@/types/health';

const HEALTH_API_BASE_URL = process.env.HEALTH_API_BASE_URL || 'http://localhost:3001/api';

class HealthService {
  async getLatestMetrics(): Promise<HealthMetric> {
    try {
      const response = await fetch(`${HEALTH_API_BASE_URL}/health/latest`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching health metrics:', error);
      throw error;
    }
  }

  async getHistoricalMetrics(days: number = 7): Promise<HealthMetric[]> {
    try {
      const response = await fetch(`${HEALTH_API_BASE_URL}/health/history?days=${days}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching historical health metrics:', error);
      throw error;
    }
  }

  async updateMetrics(metric: Partial<HealthMetric>): Promise<HealthMetric> {
    try {
      const response = await fetch(`${HEALTH_API_BASE_URL}/health`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(metric),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating health metrics:', error);
      throw error;
    }
  }
}

export const healthService = new HealthService();