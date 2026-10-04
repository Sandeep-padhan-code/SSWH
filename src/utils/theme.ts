/**
 * SSWH Master Visual Color System & Design Tokens
 * Centralized theme constants adhering strictly to the SSWH visual identity.
 */

export const SSWH_COLORS = {
  // Brand Color System
  forest: '#0F4D3A', // Primary Deep Forest
  teal: '#0B6B73', // Secondary Deep Teal
  green: '#3F6B4F', // Natural Green
  mist: '#DCEAE4', // Soft Mist Green
  background: '#F4F8F5', // Pale Background
  white: '#FFFFFF', // Pure White
  text: '#10251F', // Dark Text
  textSecondary: '#587068', // Secondary Text
  textMuted: '#71877F', // Inactive icons / neutral text
  border: '#D6E3DD', // Standard Border
  borderLight: '#E5EEE9', // Subtle Border & Grid Lines

  // Water Data Colors
  water: '#0B6B73', // Primary Water
  waterSecondary: '#4FA3A5', // Secondary Water
  waterLight: '#B9DDDD', // Light Water

  // Status & Telemetry States
  status: {
    normal: '#18A878',
    normalBg: '#E4F5EE',
    warning: '#D99024',
    warningBg: '#FFF3D8',
    critical: '#C94B5B',
    criticalBg: '#FBE8EB',
    info: '#0B6B73',
    infoBg: '#E3F2F2',
  },

  // Tank Level Thresholds (Section 9)
  tank: {
    level0_20: '#D96C75', // 0-20%
    level20_40: '#E7A45B', // 20-40%
    level40_70: '#4FA3A5', // 40-70% (Water teal)
    level70_100: '#0F4D3A', // 70-100% (Deep forest)
  },

  // Chart Visualization Palette
  chart: {
    primary: '#0F4D3A', // Deep Forest (most important series)
    water: '#0B6B73', // Deep Teal (water-related series)
    secondaryWater: '#4FA3A5', // Soft Teal (secondary comparison)
    natural: '#6FA68A', // Natural Green (environmental)
    highlight: '#D9A441', // Warm Amber (highlighted thresholds)
    warning: '#D99024',
    critical: '#C94B5B',
    neutral: '#A8BBB3',
    grid: '#E5EEE9',
    axis: '#587068',
    areaFill: 'rgba(15, 77, 58, 0.08)',
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
      border: '#BFE4E4',
    }
  }
  return {
    color: SSWH_COLORS.status.normal,
    bg: SSWH_COLORS.status.normalBg,
    border: '#BFE7D5',
  }
}
