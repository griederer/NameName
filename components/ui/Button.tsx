import React, { forwardRef } from 'react'
import { BaseComponentProps } from '@/types'

interface ButtonProps extends BaseComponentProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  disabled?: boolean
  loading?: boolean
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  type?: 'button' | 'submit' | 'reset'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'default',
      size = 'default',
      disabled = false,
      loading = false,
      onClick,
      type = 'button',
      className = '',
      ...props
    },
    ref,
  ) => {
    const baseClasses =
      'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'

    const variants = {
      default: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
      secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
      outline:
        'border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 focus:ring-blue-500',
      ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
    }

    const sizes = {
      default: 'h-10 px-4 py-2 text-base',
      sm: 'h-9 px-3 text-sm',
      lg: 'h-11 px-8 text-lg',
      icon: 'h-10 w-10',
    }

    const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (!disabled && !loading) {
        onClick?.(event)
      }
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === 'Enter' && !disabled && !loading) {
        // Create a mock mouse event for keyboard trigger
        const mockEvent = {
          ...event,
          type: 'click',
        } as unknown as React.MouseEvent<HTMLButtonElement>
        onClick?.(mockEvent)
      }
      props.onKeyDown?.(event)
    }

    return (
      <button
        {...props}
        ref={ref}
        type={type}
        className={classes}
        disabled={disabled || loading}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        {loading && (
          <svg
            className="-ml-1 mr-2 h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {children}
      </button>
    )
  },
)

Button.displayName = 'Button'
