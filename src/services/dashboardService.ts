import { DashboardData } from '@/types'
import { mockDashboardData } from '@/data/mock/dashboard'

export const dashboardService = {
  async getDashboardSummary(): Promise<DashboardData> {
    // Simulated async network delay
    await new Promise((resolve) => setTimeout(resolve, 50))
    return { ...mockDashboardData }
  },
}
