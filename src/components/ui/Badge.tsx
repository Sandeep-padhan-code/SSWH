import React from 'react'
import { cn } from '@/utils/cn'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'success' | 'warning' | 'critical' | 'neutral' | 'demo'
  size?: 'sm' | 'md'
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'neutral',
  size = 'md',
  children,
  ...props
}) => {
  const variantStyles = {
    primary: 'bg-[#E4F5EE] text-[#0F4D3A] border-[#BFE7D5]',
    success: 'bg-[#E4F5EE] text-[#18A878] border-[#BFE7D5]',
    warning: 'bg-[#FFF3D8] text-[#D99024] border-[#F3D299]',
    critical: 'bg-[#FBE8EB] text-[#C94B5B] border-[#F6B6C1]',
    neutral: 'bg-[#F4F8F5] text-[#587068] border-[#D6E3DD]',
    demo: 'bg-[#F4F8F5] text-[#0F4D3A] border-[#D6E3DD] font-mono tracking-wider',
  }

  const sizeStyles = {
    sm: 'text-[10px] px-1.5 py-0.5 rounded',
    md: 'text-xs px-2 py-0.5 rounded',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 font-medium border font-mono select-none',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
