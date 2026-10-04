import { MLInsight } from '@/types'
import { mockMLInsights } from '@/data/mock/ml'

export const mlService = {
  async getInsights(): Promise<MLInsight[]> {
    await new Promise((resolve) => setTimeout(resolve, 40))
    return [...mockMLInsights]
  },
}
