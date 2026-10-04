import { Sensor, SensorCategory } from '@/types'
import { mockSensors } from '@/data/mock/sensors'

export const sensorService = {
  async getAllSensors(category?: SensorCategory): Promise<Sensor[]> {
    await new Promise((resolve) => setTimeout(resolve, 50))
    if (!category) return [...mockSensors]
    return mockSensors.filter((s) => s.category === category)
  },

  async getSensorById(id: string): Promise<Sensor | undefined> {
    await new Promise((resolve) => setTimeout(resolve, 30))
    return mockSensors.find((s) => s.id === id)
  },
}
