import React from 'react'
import { cn } from '@/utils/cn'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg' | 'icon'
  isLoading?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const variantStyles = {
      primary:
        'bg-[#5494DA] hover:bg-[#73B9EE] active:bg-[#437ec0] text-white border border-[#5494DA] shadow-xs',
      secondary:
        'bg-white hover:bg-[#F0F6FD] text-[#5494DA] border border-[#5494DA]',
      outline:
        'border border-[#D1E2F5] bg-white hover:bg-[#F0F6FD] text-[#0E1B2A]',
      ghost:
        'hover:bg-[#F0F6FD] text-[#4A637D]',
      danger:
        'bg-[#C94B5B] hover:bg-[#B33B4B] text-white border border-[#C94B5B]',
    }

    const sizeStyles = {
      sm: 'h-7 px-2.5 text-xs rounded gap-1.5',
      md: 'h-8 px-3 text-xs font-medium rounded gap-2',
      lg: 'h-9 px-4 text-sm font-medium rounded gap-2',
      icon: 'h-8 w-8 p-0 rounded justify-center',
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5494DA] focus-visible:ring-offset-1 disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'
