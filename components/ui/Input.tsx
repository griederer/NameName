import React, { forwardRef } from 'react'
import { BaseComponentProps } from '@/types'

interface InputProps
  extends BaseComponentProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  type?: 'text' | 'email' | 'password' | 'number' | 'search'
  placeholder?: string
  value?: string
  defaultValue?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void | ((value: string) => void)
  disabled?: boolean
  error?: string
  label?: string
  required?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = 'text',
      placeholder,
      value,
      defaultValue,
      onChange,
      disabled = false,
      error,
      label,
      required = false,
      className = '',
      ...props
    },
    ref,
  ) => {
    const baseClasses =
      'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'

    const stateClasses = error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''

    const classes = `${baseClasses} ${stateClasses} ${className}`

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return

      if (onChange) {
        if (onChange.length === 1) {
          // If onChange expects just the value
          ;(onChange as (value: string) => void)(e.target.value)
        } else {
          // If onChange expects the event
          ;(onChange as (e: React.ChangeEvent<HTMLInputElement>) => void)(e)
        }
      }
    }

    // If label prop is provided, render the full component with wrapper
    if (label) {
      return (
        <div className="w-full">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <input
            {...props}
            ref={ref}
            type={type}
            className={classes}
            placeholder={placeholder}
            value={value}
            defaultValue={defaultValue}
            onChange={handleChange}
            disabled={disabled}
            required={required}
          />
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
      )
    }

    // If no label, render just the input
    return (
      <input
        {...props}
        ref={ref}
        type={type}
        className={classes}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        disabled={disabled}
        required={required}
      />
    )
  },
)

Input.displayName = 'Input'
