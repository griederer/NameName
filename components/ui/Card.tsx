import React, { forwardRef } from 'react'
import { BaseComponentProps } from '@/types'

interface CardProps extends BaseComponentProps, React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType
}

interface CardHeaderProps extends BaseComponentProps, React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType
}

interface CardTitleProps extends BaseComponentProps, React.HTMLAttributes<HTMLHeadingElement> {
  as?: React.ElementType
}

interface CardDescriptionProps
  extends BaseComponentProps,
    React.HTMLAttributes<HTMLParagraphElement> {}

interface CardContentProps extends BaseComponentProps, React.HTMLAttributes<HTMLDivElement> {}

interface CardFooterProps extends BaseComponentProps, React.HTMLAttributes<HTMLDivElement> {}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, className = '', as: Component = 'div', ...props }, ref) => {
    const classes = `rounded-lg border bg-card text-card-foreground shadow-sm ${className}`

    return (
      <Component ref={ref} className={classes} {...props}>
        {children}
      </Component>
    )
  },
)

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, className = '', as: Component = 'div', ...props }, ref) => {
    const classes = `flex flex-col space-y-1.5 p-6 ${className}`

    return (
      <Component ref={ref} className={classes} {...props}>
        {children}
      </Component>
    )
  },
)

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ children, className = '', as: Component = 'h3', ...props }, ref) => {
    const classes = `text-2xl font-semibold leading-none tracking-tight ${className}`

    return (
      <Component ref={ref} className={classes} {...props}>
        {children}
      </Component>
    )
  },
)

export const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ children, className = '', ...props }, ref) => {
    const classes = `text-sm text-muted-foreground ${className}`

    return (
      <p ref={ref} className={classes} {...props}>
        {children}
      </p>
    )
  },
)

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ children, className = '', ...props }, ref) => {
    const classes = `p-6 pt-0 ${className}`

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    )
  },
)

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ children, className = '', ...props }, ref) => {
    const classes = `flex items-center p-6 pt-0 ${className}`

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    )
  },
)

Card.displayName = 'Card'
CardHeader.displayName = 'CardHeader'
CardTitle.displayName = 'CardTitle'
CardDescription.displayName = 'CardDescription'
CardContent.displayName = 'CardContent'
CardFooter.displayName = 'CardFooter'
