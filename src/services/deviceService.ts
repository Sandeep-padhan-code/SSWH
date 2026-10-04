import { Device, DeviceCategory } from '@/types'
import { mockDevices } from '@/data/mock/devices'

export const deviceService = {
  async getAllDevices(category?: DeviceCategory): Promise<Device[]> {
    await new Promise((resolve) => setTimeout(resolve, 50))
    if (!category) return [...mockDevices]
    return mockDevices.filter((d) => d.category === category)
  },

  async getDeviceById(id: string): Promise<Device | undefined> {
    await new Promise((resolve) => setTimeout(resolve, 30))
    return mockDevices.find((d) => d.id === id)
  },
}
