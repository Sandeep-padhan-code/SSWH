import { WaterUsage, WaterQuality } from '@/types'
import {
  mockUsageByZone,
  mockQualitySummary,
  mockConsumptionTrend,
  mockTankLevelTrend,
  mockReuseComparison,
} from '@/data/mock/water'

export const waterService = {
  async getUsageByZone(): Promise<WaterUsage[]> {
    await new Promise((resolve) => setTimeout(resolve, 40))
    return [...mockUsageByZone]
  },

  async getQualitySummary(): Promise<WaterQuality[]> {
    await new Promise((resolve) => setTimeout(resolve, 40))
    return [...mockQualitySummary]
  },

  async getConsumptionTrend() {
    await new Promise((resolve) => setTimeout(resolve, 40))
    return [...mockConsumptionTrend]
  },

  async getTankLevelTrend() {
    await new Promise((resolve) => setTimeout(resolve, 40))
    return [...mockTankLevelTrend]
  },

  async getReuseComparison() {
    await new Promise((resolve) => setTimeout(resolve, 40))
    return [...mockReuseComparison]
  },
}
