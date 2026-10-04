import { DashboardMetric, DashboardData } from '@/types'
import { mockTanks } from './tanks'
import { mockAlerts } from './alerts'
import { mockMLInsights } from './ml'
import {
  mockUsageByZone,
  mockQualitySummary,
  mockTankLevelTrend,
  mockConsumptionTrend,
  mockReuseComparison,
} from './water'

export const mockDashboardMetrics: DashboardMetric[] = [
  {
    id: 'kpi-col',
    label: 'Total Water Collected',
    value: '12,450',
    unit: 'L',
    trend: { value: 12.4, isPositive: true, label: 'vs last week' },
    status: 'NORMAL',
    sublabel: 'Rainwater + Groundwater + Municipal',
    iconName: 'Droplets',
  },
  {
    id: 'kpi-con',
    label: 'Total Water Consumed',
    value: '8,320',
    unit: 'L',
    trend: { value: 8.2, isPositive: true, label: 'within budgeted limit' },
    status: 'NORMAL',
    sublabel: 'Across all building zones',
    iconName: 'Home',
  },
  {
    id: 'kpi-avl',
    label: 'Water Available',
    value: '14,200',
    unit: 'L',
    trend: { value: 4.5, isPositive: true, label: 'net reserve buffer' },
    status: 'NORMAL',
    sublabel: 'T1 (8.0L) + T2 (6.2L) in prototype',
    iconName: 'Database',
  },
  {
    id: 'kpi-reu',
    label: 'Water Reused',
    value: '2,890',
    unit: 'L',
    trend: { value: 15.8, isPositive: true, label: 'recycled volume' },
    status: 'NORMAL',
    sublabel: 'Gardening & toilet flushing offset',
    iconName: 'Recycle',
  },
  {
    id: 'kpi-rain',
    label: 'Rainwater Collected',
    value: '4,480',
    unit: 'L',
    trend: { value: 24.1, isPositive: true, label: 'of total intake' },
    status: 'NORMAL',
    sublabel: '36% sustainability offset ratio',
    iconName: 'CloudRain',
  },
  {
    id: 'kpi-drk',
    label: 'Drinking Water Remaining',
    value: '4.2',
    unit: 'L / 5.0 L',
    trend: { value: 18, isPositive: true, label: 'hours remaining duration' },
    status: 'NORMAL',
    sublabel: '100°C sterilized reserve',
    iconName: 'GlassWater',
  },
  {
    id: 'kpi-alt',
    label: 'Active Alerts',
    value: '2',
    unit: 'Unresolved',
    status: 'WARNING',
    sublabel: '1 Critical (Leak), 1 Warning (T3)',
    iconName: 'AlertTriangle',
  },
  {
    id: 'kpi-hlth',
    label: 'System Health',
    value: '98.5%',
    unit: 'Optimal',
    status: 'NORMAL',
    sublabel: 'All 12 nodes reporting nominal',
    iconName: 'ShieldCheck',
  },
]

export const mockDashboardData: DashboardData = {
  metrics: mockDashboardMetrics,
  tanks: mockTanks,
  waterLevelTrend: mockTankLevelTrend,
  consumptionTrend: mockConsumptionTrend,
  collectionSources: [
    { source: 'Rainwater Catchment', volume: 4480, percentage: 36 },
    { source: 'Groundwater Borewell', volume: 4980, percentage: 40 },
    { source: 'Municipal Grid Supply', volume: 2990, percentage: 24 },
  ],
  reuseComparison: mockReuseComparison,
  zoneBreakdown: mockUsageByZone,
  qualitySummary: mockQualitySummary,
  recentAlerts: mockAlerts.slice(0, 3),
  aiInsights: mockMLInsights.slice(0, 3),
}
