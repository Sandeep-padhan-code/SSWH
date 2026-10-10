/**
 * SSWH Master Visual Color System & Design Tokens
 * Centralized theme constants adhering strictly to the SSWH visual identity.
 * Primary blue: #5494DA
 * Secondary blue: #73B9EE
 * Light blue: #86CEFA
 */

export const SSWH_COLORS = {
  // Required Exact Blue Color System
  primaryBlue: '#5494DA',
  secondaryBlue: '#73B9EE',
  lightBlue: '#86CEFA',

  // Brand Color System (Mapped to exact blue palette)
  forest: '#5494DA', // Primary Blue
  teal: '#73B9EE', // Secondary Blue
  green: '#86CEFA', // Light Blue
  mist: '#EAF3FD', // Soft Mist Blue
  background: '#F4F8FB', // Light Blue-tinted Neutral
  white: '#FFFFFF', // Pure White
  text: '#0E1B2A', // Dark Blue-Grey Text
  textSecondary: '#4A637D', // Secondary Slate Text
  textMuted: '#6D869F', // Inactive icons / neutral text
  border: '#D1E2F5', // Standard Border
  borderLight: '#E4EFFB', // Subtle Border & Grid Lines

  // Water Data Colors
  water: '#5494DA', // Primary Water (Primary Blue)
  waterSecondary: '#73B9EE', // Secondary Water (Secondary Blue)
  waterLight: '#86CEFA', // Light Water (Light Blue)

  // Status & Telemetry States (PRESERVED FOR OPERATIONAL SAFETY)
  status: {
    normal: '#18A878',
    normalBg: '#E4F5EE',
    warning: '#D99024',
    warningBg: '#FFF3D8',
    critical: '#C94B5B',
    criticalBg: '#FBE8EB',
    info: '#5494DA',
    infoBg: '#EAF3FD',
  },

  // Tank Level Thresholds (Preserving functional thresholds)
  tank: {
    level0_20: '#D96C75', // 0-20% (Critical)
    level20_40: '#E7A45B', // 20-40% (Warning)
    level40_70: '#73B9EE', // 40-70% (Secondary Blue)
    level70_100: '#5494DA', // 70-100% (Primary Blue)
  },

  // Chart Visualization Palette
  chart: {
    primary: '#5494DA', // Primary Blue (most important series)
    water: '#73B9EE', // Secondary Blue (water-related series)
    secondaryWater: '#86CEFA', // Light Blue (secondary comparison)
    natural: '#5494DA', // Environmental series
    highlight: '#D9A441', // Warm Amber (highlighted thresholds)
    warning: '#D99024',
    critical: '#C94B5B',
    neutral: '#9BB8D3',
    grid: '#E4EFFB',
    axis: '#4A637D',
    areaFill: 'rgba(84, 148, 218, 0.12)',
  },
} as const

/**
 * Returns the compliant SSWH color for a tank based on its level percentage
 */
export function getTankColor(percentage: number): string {
  if (percentage <= 20) return SSWH_COLORS.tank.level0_20
  if (percentage <= 40) return SSWH_COLORS.tank.level20_40
  if (percentage <= 70) return SSWH_COLORS.tank.level40_70
  return SSWH_COLORS.tank.level70_100
}

/**
 * Returns the status color and background for normal/warning/critical/info
 */
export function getStatusTheme(severity: 'NORMAL' | 'WARNING' | 'CRITICAL' | 'INFO' | string) {
  const norm = severity.toUpperCase()
  if (norm === 'WARNING') {
    return {
      color: SSWH_COLORS.status.warning,
      bg: SSWH_COLORS.status.warningBg,
      border: '#F3D299',
    }
  }
  if (norm === 'CRITICAL') {
    return {
      color: SSWH_COLORS.status.critical,
      bg: SSWH_COLORS.status.criticalBg,
      border: '#F6B6C1',
    }
  }
  if (norm === 'INFO') {
    return {
      color: SSWH_COLORS.status.info,
      bg: SSWH_COLORS.status.infoBg,
      border: '#D1E2F5',
    }
  }
  return {
    color: SSWH_COLORS.status.normal,
    bg: SSWH_COLORS.status.normalBg,
    border: '#BFE7D5',
  }
}
