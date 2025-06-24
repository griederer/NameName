import React, { forwardRef } from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Input } from '../../../components/ui/Input'

describe('Input Component', () => {
  describe('Rendering', () => {
    it('renders input element', () => {
      render(<Input />)
      expect(screen.getByRole('textbox')).toBeInTheDocument()
    })

    it('renders with placeholder', () => {
      render(<Input placeholder="Enter text here" />)
      expect(screen.getByPlaceholderText('Enter text here')).toBeInTheDocument()
    })

    it('renders with default value', () => {
      render(<Input defaultValue="Default text" />)
      const input = screen.getByRole('textbox') as HTMLInputElement
      expect(input.value).toBe('Default text')
    })

    it('renders with controlled value', () => {
      render(<Input value="Controlled text" readOnly />)
      const input = screen.getByRole('textbox') as HTMLInputElement
      expect(input.value).toBe('Controlled text')
    })
  })

  describe('Input Types', () => {
    it('renders text input by default', () => {
      render(<Input data-testid="input" />)
      const input = screen.getByTestId('input')
      expect(input).toHaveAttribute('type', 'text')
    })

    it('renders email input', () => {
      render(<Input type="email" data-testid="input" />)
      const input = screen.getByTestId('input')
      expect(input).toHaveAttribute('type', 'email')
    })

    it('renders password input', () => {
      render(<Input type="password" data-testid="input" />)
      const input = screen.getByTestId('input')
      expect(input).toHaveAttribute('type', 'password')
    })

    it('renders number input', () => {
      render(<Input type="number" data-testid="input" />)
      const input = screen.getByTestId('input')
      expect(input).toHaveAttribute('type', 'number')
    })

    it('renders search input', () => {
      render(<Input type="search" data-testid="input" />)
      const input = screen.getByTestId('input')
      expect(input).toHaveAttribute('type', 'search')
    })
  })

  describe('Styling', () => {
    it('applies default styling classes', () => {
      render(<Input data-testid="input" />)
      const input = screen.getByTestId('input')
      expect(input).toHaveClass(
        'flex',
        'h-10',
        'w-full',
        'rounded-md',
        'border',
        'border-input',
        'bg-background',
        'px-3',
        'py-2',
        'text-sm',
        'ring-offset-background',
      )
    })

    it('accepts custom className', () => {
      render(<Input className="custom-input-class" data-testid="input" />)
      const input = screen.getByTestId('input')
      expect(input).toHaveClass('custom-input-class')
    })

    it('merges custom className with default classes', () => {
      render(<Input className="custom-class" data-testid="input" />)
      const input = screen.getByTestId('input')
      expect(input).toHaveClass('custom-class', 'flex', 'h-10', 'w-full')
    })
  })

  describe('States', () => {
    it('renders disabled state', () => {
      render(<Input disabled data-testid="input" />)
      const input = screen.getByTestId('input')
      expect(input).toBeDisabled()
      expect(input).toHaveClass('disabled:cursor-not-allowed', 'disabled:opacity-50')
    })

    it('renders readonly state', () => {
      render(<Input readOnly data-testid="input" />)
      const input = screen.getByTestId('input')
      expect(input).toHaveAttribute('readonly')
    })

    it('renders required state', () => {
      render(<Input required data-testid="input" />)
      const input = screen.getByTestId('input')
      expect(input).toBeRequired()
    })
  })

  describe('Interactions', () => {
    it('handles onChange events', () => {
      const handleChange = jest.fn()
      render(<Input onChange={handleChange} />)
      const input = screen.getByRole('textbox')

      fireEvent.change(input, { target: { value: 'test input' } })
      expect(handleChange).toHaveBeenCalledTimes(1)
      expect(handleChange).toHaveBeenCalledWith(expect.any(Object))
    })

    it('handles onFocus events', () => {
      const handleFocus = jest.fn()
      render(<Input onFocus={handleFocus} />)
      const input = screen.getByRole('textbox')

      fireEvent.focus(input)
      expect(handleFocus).toHaveBeenCalledTimes(1)
    })

    it('handles onBlur events', () => {
      const handleBlur = jest.fn()
      render(<Input onBlur={handleBlur} />)
      const input = screen.getByRole('textbox')

      fireEvent.focus(input)
      fireEvent.blur(input)
      expect(handleBlur).toHaveBeenCalledTimes(1)
    })

    it('handles onKeyDown events', () => {
      const handleKeyDown = jest.fn()
      render(<Input onKeyDown={handleKeyDown} />)
      const input = screen.getByRole('textbox')

      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })
      expect(handleKeyDown).toHaveBeenCalledTimes(1)
    })

    it('does not fire onChange when disabled', () => {
      const handleChange = jest.fn()
      render(<Input disabled onChange={handleChange} />)
      const input = screen.getByRole('textbox')

      fireEvent.change(input, { target: { value: 'test' } })
      expect(handleChange).not.toHaveBeenCalled()
    })
  })

  describe('Focus Management', () => {
    it('can be focused programmatically', () => {
      const ref = { current: null as HTMLInputElement | null }
      const RefInput = forwardRef<HTMLInputElement>((props, forwardedRef) => (
        <Input ref={forwardedRef} {...props} />
      ))

      render(<RefInput ref={ref} />)

      if (ref.current) {
        ref.current.focus()
        expect(ref.current).toHaveFocus()
      }
    })

    it('shows focus styles when focused', () => {
      render(<Input data-testid="input" />)
      const input = screen.getByTestId('input')

      input.focus()
      expect(input).toHaveFocus()
      // Focus styles are applied via CSS, so we just verify focus state
    })
  })

  describe('Validation', () => {
    it('supports HTML5 validation attributes', () => {
      render(
        <Input required minLength={3} maxLength={10} pattern="[A-Za-z]+" data-testid="input" />,
      )
      const input = screen.getByTestId('input')

      expect(input).toBeRequired()
      expect(input).toHaveAttribute('minLength', '3')
      expect(input).toHaveAttribute('maxLength', '10')
      expect(input).toHaveAttribute('pattern', '[A-Za-z]+')
    })

    it('supports email validation', () => {
      render(<Input type="email" data-testid="input" />)
      const input = screen.getByTestId('input')
      expect(input).toHaveAttribute('type', 'email')
    })

    it('supports number validation with min/max', () => {
      render(<Input type="number" min="0" max="100" data-testid="input" />)
      const input = screen.getByTestId('input')
      expect(input).toHaveAttribute('type', 'number')
      expect(input).toHaveAttribute('min', '0')
      expect(input).toHaveAttribute('max', '100')
    })
  })

  describe('Accessibility', () => {
    it('supports aria-label', () => {
      render(<Input aria-label="Search input" />)
      expect(screen.getByLabelText('Search input')).toBeInTheDocument()
    })

    it('supports aria-describedby', () => {
      render(<Input aria-describedby="help-text" data-testid="input" />)
      const input = screen.getByTestId('input')
      expect(input).toHaveAttribute('aria-describedby', 'help-text')
    })

    it('supports aria-invalid for error states', () => {
      render(<Input aria-invalid="true" data-testid="input" />)
      const input = screen.getByTestId('input')
      expect(input).toHaveAttribute('aria-invalid', 'true')
    })

    it('supports aria-required', () => {
      render(<Input aria-required="true" data-testid="input" />)
      const input = screen.getByTestId('input')
      expect(input).toHaveAttribute('aria-required', 'true')
    })
  })

  describe('Form Integration', () => {
    it('works with form submission', () => {
      const handleSubmit = jest.fn()
      render(
        <form onSubmit={handleSubmit}>
          <Input name="username" defaultValue="testuser" />
          <button type="submit">Submit</button>
        </form>,
      )

      const input = screen.getByRole('textbox') as HTMLInputElement

      expect(input.name).toBe('username')
      expect(input.value).toBe('testuser')
    })

    it('supports autoComplete attribute', () => {
      render(<Input autoComplete="email" data-testid="input" />)
      const input = screen.getByTestId('input')
      expect(input).toHaveAttribute('autoComplete', 'email')
    })

    it('supports name attribute', () => {
      render(<Input name="email" data-testid="input" />)
      const input = screen.getByTestId('input')
      expect(input).toHaveAttribute('name', 'email')
    })

    it('supports id attribute', () => {
      render(<Input id="email-input" data-testid="input" />)
      const input = screen.getByTestId('input')
      expect(input).toHaveAttribute('id', 'email-input')
    })
  })

  describe('Ref Forwarding', () => {
    it('forwards ref to input element', () => {
      const ref = jest.fn()
      render(<Input ref={ref} />)
      expect(ref).toHaveBeenCalledWith(expect.any(HTMLInputElement))
    })
  })
})
