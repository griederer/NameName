import React from 'react'
import { BaseComponentProps } from '@/types'

interface CardProps extends BaseComponentProps {
  title?: string
  subtitle?: string
  padding?: 'sm' | 'md' | 'lg'
  shadow?: 'none' | 'sm' | 'md' | 'lg'
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  padding = 'md',
  shadow = 'md',
  className = '',
}) => {
  const baseClasses = 'bg-white rounded-lg border border-gray-200'

  const paddingClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  }

  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
  }

  const classes = `${baseClasses} ${paddingClasses[padding]} ${shadowClasses[shadow]} ${className}`

  return (
    <div className={classes}>
      {(title || subtitle) && (
        <div className="mb-3">
          {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
          {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  )
}
