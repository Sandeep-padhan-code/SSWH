import React from 'react'
import { StatusBadge, StatusBadgeProps } from './StatusBadge'

export type StatusPillProps = StatusBadgeProps

export const StatusPill: React.FC<StatusPillProps> = (props) => {
  return <StatusBadge {...props} />
}
