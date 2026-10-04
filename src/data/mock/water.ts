import { WaterUsage, WaterQuality } from '@/types'

export const mockUsageByZone: WaterUsage[] = [
  { zone: 'BATHROOM', label: 'Bathroom & Showers', volumeLiters: 3200, percentage: 38.5, trendPercent: -4.2 },
  { zone: 'KITCHEN', label: 'Kitchen & Dining', volumeLiters: 1800, percentage: 21.6, trendPercent: +1.5 },
  { zone: 'GARDENING', label: 'Gardening & Irrigation (Reused)', volumeLiters: 1200, percentage: 14.4, trendPercent: +8.0 },
  { zone: 'CLEANING', label: 'Facility Cleaning & Mopping', volumeLiters: 900, percentage: 10.8, trendPercent: -2.0 },
  { zone: 'CAR_WASH', label: 'Vehicle Wash Bay (Reused)', volumeLiters: 720, percentage: 8.7, trendPercent: +0.5 },
  { zone: 'DRINKING', label: 'Drinking Water Module', volumeLiters: 500, percentage: 6.0, trendPercent: 0.0 },
]

export const mockQualitySummary: WaterQuality[] = [
  { parameter: 'pH Index', currentValue: 7.2, unit: 'pH', safeRange: '6.5 – 8.5', status: 'NORMAL', trend: 'STABLE' },
  { parameter: 'TDS (Solids)', currentValue: 120, unit: 'ppm', safeRange: '< 300 ppm', status: 'NORMAL', trend: 'STABLE' },
  { parameter: 'Turbidity (Optical)', currentValue: 0.3, unit: 'NTU', safeRange: '< 1.0 NTU', status: 'NORMAL', trend: 'FALLING' },
  { parameter: 'Water Temperature', currentValue: 21.4, unit: '°C', safeRange: '15 – 25 °C', status: 'NORMAL', trend: 'STABLE' },
  { parameter: 'Chlorine Residual', currentValue: 0.5, unit: 'mg/L', safeRange: '0.2 – 1.0 mg/L', status: 'NORMAL', trend: 'STABLE' },
]

export const mockTankLevelTrend = [
  { time: '00:00', t1: 65, t2: 78, t3: 20, t4: 45 },
  { time: '04:00', t1: 70, t2: 72, t3: 22, t4: 48 },
  { time: '08:00', t1: 68, t2: 60, t3: 45, t4: 50 },
  { time: '12:00', t1: 85, t2: 65, t3: 55, t4: 62 },
  { time: '16:00', t1: 82, t2: 70, t3: 40, t4: 68 },
  { time: '20:00', t1: 80, t2: 74, t3: 30, t4: 72 },
]

export const mockConsumptionTrend = [
  { day: 'Mon', municipal: 520, harvested: 310 },
  { day: 'Tue', municipal: 480, harvested: 340 },
  { day: 'Wed', municipal: 610, harvested: 290 },
  { day: 'Thu', municipal: 430, harvested: 410 },
  { day: 'Fri', municipal: 550, harvested: 380 },
  { day: 'Sat', municipal: 680, harvested: 450 },
  { day: 'Sun', municipal: 590, harvested: 420 },
]

export const mockReuseComparison = [
  { day: 'Mon', generated: 420, treated: 390, reused: 370 },
  { day: 'Tue', generated: 410, treated: 380, reused: 360 },
  { day: 'Wed', generated: 460, treated: 430, reused: 400 },
  { day: 'Thu', generated: 390, treated: 370, reused: 350 },
  { day: 'Fri', generated: 440, treated: 410, reused: 390 },
  { day: 'Sat', generated: 510, treated: 480, reused: 450 },
  { day: 'Sun', generated: 480, treated: 450, reused: 430 },
]
