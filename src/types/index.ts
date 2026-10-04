export type UserRole =
  | 'SCADA'
  | 'FACILITIES_LEAD'
  | 'TENANT_OBSERVER'
  | 'ADMIN'
  | 'BUILDING_MANAGER'
  | 'RESIDENT'

export type Permission =
  | 'VIEW_REALTIME_DATA'
  | 'VIEW_ANALYTICS'
  | 'VIEW_ALERTS'
  | 'CONTROL_PUMP'
  | 'CONTROL_VALVE'
  | 'CONTROL_EQUIPMENT'
  | 'VIEW_REPORTS'
  | 'MANAGE_MAINTENANCE'
  | 'SYSTEM_CONFIG'
  | 'VIEW_AUDIT_LOG'

export interface AuditLogEntry {
  id: string
  user: string
  role: UserRole
  action: string
  device: string
  timestamp: string
  result: 'SUCCESS' | 'DENIED' | 'FAILED'
  details?: string
}

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  buildingName?: string
  apartment?: string
  balance?: number
  avatar?: string
}

export type StatusSeverity = 'NORMAL' | 'WARNING' | 'CRITICAL' | 'OFFLINE' | 'SIMULATED'

export type OperatingMode = 'AUTO' | 'MANUAL' | 'DRINKING' | 'REUSE'

export interface NavItem {
  name: string
  path: string
  icon: string
  badge?: string | number
  roles?: UserRole[]
}

// Device Types
export type DeviceCategory = 'GATEWAY' | 'CONTROLLER' | 'SENSOR' | 'ACTUATOR' | 'POWER'

export interface Device {
  id: string
  name: string
  type: string
  category: DeviceCategory
  location: string
  status: StatusSeverity
  connectivity: 'ONLINE' | 'OFFLINE' | 'SIMULATED'
  lastSeen: string
  firmwareVersion?: string
  batteryLevel?: string
  specs?: Record<string, string>
}

// Sensor Types
export type SensorCategory = 'FLOW' | 'PRESSURE' | 'LEVEL' | 'QUALITY' | 'TEMPERATURE' | 'LEAK'

export interface Sensor {
  id: string
  name: string
  type: string
  category: SensorCategory
  location: string
  currentValue: number | string
  unit: string
  status: StatusSeverity
  safeRange?: string
  warningRange?: string
  criticalRange?: string
  lastUpdated: string
  icon?: string
}

export interface SensorReading {
  sensorId: string
  timestamp: string
  value: number | string
  unit: string
  status: StatusSeverity
}

// Tank Types
export type TankId = 'T1' | 'T2' | 'T3' | 'T4'

export interface Tank {
  id: TankId
  name: string
  code: string
  role: string
  description: string
  currentQuantity: number // Liters
  capacity: number // Liters
  percentage: number
  inflowRate: number // L/min
  outflowRate: number // L/min
  status: StatusSeverity
  sensorId: string
  warningThreshold: number // %
  criticalThreshold: number // %
  lastUpdated: string
}

export interface TankReading {
  tankId: TankId
  timestamp: string
  levelPercent: number
  quantityLiters: number
}

// Water Metrics
export type UsageZoneType =
  | 'HOUSEHOLD'
  | 'BATHROOM'
  | 'KITCHEN'
  | 'GARDENING'
  | 'CAR_WASH'
  | 'CLEANING'
  | 'DRINKING'
  | 'OTHER'

export interface WaterUsage {
  zone: UsageZoneType
  label: string
  volumeLiters: number
  percentage: number
  trendPercent: number
}

export interface WaterCollection {
  source: 'RAINWATER' | 'GROUNDWATER' | 'MUNICIPAL'
  volumeLiters: number
  efficiencyPercent: number
  collectionRateLpm: number
}

export interface WaterQuality {
  parameter: string
  currentValue: number
  unit: string
  safeRange: string
  status: StatusSeverity
  trend: 'STABLE' | 'RISING' | 'FALLING'
}

// Alerts & Notifications
export type AlertSeverity = 'INFO' | 'WARNING' | 'CRITICAL'
export type AlertCategory =
  | 'LEAK'
  | 'TANK_LEVEL'
  | 'DRINKING_WATER'
  | 'QUALITY'
  | 'DEVICE'
  | 'CONSUMPTION'
  | 'SYSTEM'

export interface Alert {
  id: string
  title: string
  description: string
  severity: AlertSeverity
  category: AlertCategory
  source: string
  location: string
  timestamp: string
  isResolved: boolean
  resolvedAt?: string
  resolvedBy?: string
}

export interface Notification {
  id: string
  title: string
  message: string
  severity: AlertSeverity
  timestamp: string
  isRead: boolean
  link?: string
}

// AI/ML Insights
export interface MLInsight {
  id: string
  modelName: string
  targetArea: string
  title: string
  recommendation: string
  status: 'STAGED' | 'ACTIVE_PREDICTION' | 'UNAVAILABLE'
  confidencePercent: number
  timeHorizon: string
  timestamp: string
  dataSource: 'MOCK_ENGINE' | 'PYTHON_MICROSERVICE'
}

// Top Dashboard Metrics
export interface DashboardMetric {
  id: string
  label: string
  value: string | number
  unit?: string
  trend?: {
    value: number
    isPositive: boolean
    label: string
  }
  status?: StatusSeverity
  sublabel?: string
  iconName: string
}

export interface DashboardData {
  metrics: DashboardMetric[]
  tanks: Tank[]
  waterLevelTrend: Array<{ time: string; t1: number; t2: number; t3: number; t4: number }>
  consumptionTrend: Array<{ day: string; municipal: number; harvested: number }>
  collectionSources: Array<{ source: string; volume: number; percentage: number }>
  reuseComparison: Array<{ day: string; generated: number; treated: number; reused: number }>
  zoneBreakdown: WaterUsage[]
  qualitySummary: WaterQuality[]
  recentAlerts: Alert[]
  aiInsights: MLInsight[]
}
