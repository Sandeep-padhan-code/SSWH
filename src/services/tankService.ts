import { Tank, TankId } from '@/types'
import { mockTanks } from '@/data/mock/tanks'

export const tankService = {
  async getAllTanks(): Promise<Tank[]> {
    await new Promise((resolve) => setTimeout(resolve, 50))
    return [...mockTanks]
  },

  async getTankById(id: TankId): Promise<Tank | undefined> {
    await new Promise((resolve) => setTimeout(resolve, 30))
    return mockTanks.find((t) => t.id === id)
  },
}
