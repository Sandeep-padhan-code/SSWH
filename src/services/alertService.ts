import { Alert } from '@/types'
import { mockAlerts } from '@/data/mock/alerts'

export const alertService = {
  async getAllAlerts(): Promise<Alert[]> {
    await new Promise((resolve) => setTimeout(resolve, 40))
    return [...mockAlerts]
  },

  async getRecentAlerts(limit = 5): Promise<Alert[]> {
    await new Promise((resolve) => setTimeout(resolve, 40))
    return mockAlerts.slice(0, limit)
  },

  async resolveAlert(id: string): Promise<boolean> {
    const alert = mockAlerts.find((a) => a.id === id)
    if (alert) {
      alert.isResolved = true
      alert.resolvedAt = new Date().toLocaleTimeString()
      return true
    }
    return false
  },
}
