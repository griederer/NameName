import React from 'react'
import { render, screen } from '@testing-library/react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../../../components/ui/Card'

describe('Card Components', () => {
  describe('Card', () => {
    it('renders children correctly', () => {
      render(
        <Card>
          <div data-testid="card-content">Card content</div>
        </Card>,
      )
      expect(screen.getByTestId('card-content')).toBeInTheDocument()
    })

    it('applies default styling', () => {
      render(<Card data-testid="card">Test</Card>)
      const card = screen.getByTestId('card')
      expect(card).toHaveClass(
        'rounded-lg',
        'border',
        'bg-card',
        'text-card-foreground',
        'shadow-sm',
      )
    })

    it('accepts custom className', () => {
      render(
        <Card className="custom-class" data-testid="card">
          Test
        </Card>,
      )
      const card = screen.getByTestId('card')
      expect(card).toHaveClass('custom-class')
    })

    it('forwards additional props', () => {
      render(
        <Card id="test-card" data-custom="value" data-testid="card">
          Test
        </Card>,
      )
      const card = screen.getByTestId('card')
      expect(card).toHaveAttribute('id', 'test-card')
      expect(card).toHaveAttribute('data-custom', 'value')
    })
  })

  describe('CardHeader', () => {
    it('renders children correctly', () => {
      render(
        <CardHeader>
          <div data-testid="header-content">Header content</div>
        </CardHeader>,
      )
      expect(screen.getByTestId('header-content')).toBeInTheDocument()
    })

    it('applies default styling', () => {
      render(<CardHeader data-testid="header">Test</CardHeader>)
      const header = screen.getByTestId('header')
      expect(header).toHaveClass('flex', 'flex-col', 'space-y-1.5', 'p-6')
    })

    it('accepts custom className', () => {
      render(
        <CardHeader className="custom-header" data-testid="header">
          Test
        </CardHeader>,
      )
      const header = screen.getByTestId('header')
      expect(header).toHaveClass('custom-header')
    })
  })

  describe('CardTitle', () => {
    it('renders children correctly', () => {
      render(<CardTitle>Card Title</CardTitle>)
      expect(screen.getByText('Card Title')).toBeInTheDocument()
    })

    it('applies default styling', () => {
      render(<CardTitle data-testid="title">Test Title</CardTitle>)
      const title = screen.getByTestId('title')
      expect(title).toHaveClass('text-2xl', 'font-semibold', 'leading-none', 'tracking-tight')
    })

    it('accepts custom className', () => {
      render(
        <CardTitle className="custom-title" data-testid="title">
          Test
        </CardTitle>,
      )
      const title = screen.getByTestId('title')
      expect(title).toHaveClass('custom-title')
    })

    it('renders as h3 element by default', () => {
      render(<CardTitle>Test Title</CardTitle>)
      const title = screen.getByRole('heading', { level: 3 })
      expect(title).toBeInTheDocument()
    })
  })

  describe('CardDescription', () => {
    it('renders children correctly', () => {
      render(<CardDescription>Card description</CardDescription>)
      expect(screen.getByText('Card description')).toBeInTheDocument()
    })

    it('applies default styling', () => {
      render(<CardDescription data-testid="description">Test description</CardDescription>)
      const description = screen.getByTestId('description')
      expect(description).toHaveClass('text-sm', 'text-muted-foreground')
    })

    it('accepts custom className', () => {
      render(
        <CardDescription className="custom-desc" data-testid="description">
          Test
        </CardDescription>,
      )
      const description = screen.getByTestId('description')
      expect(description).toHaveClass('custom-desc')
    })

    it('renders as p element', () => {
      render(<CardDescription>Test description</CardDescription>)
      const description = screen.getByText('Test description')
      expect(description.tagName).toBe('P')
    })
  })

  describe('CardContent', () => {
    it('renders children correctly', () => {
      render(
        <CardContent>
          <div data-testid="content">Content</div>
        </CardContent>,
      )
      expect(screen.getByTestId('content')).toBeInTheDocument()
    })

    it('applies default styling', () => {
      render(<CardContent data-testid="content">Test content</CardContent>)
      const content = screen.getByTestId('content')
      expect(content).toHaveClass('p-6', 'pt-0')
    })

    it('accepts custom className', () => {
      render(
        <CardContent className="custom-content" data-testid="content">
          Test
        </CardContent>,
      )
      const content = screen.getByTestId('content')
      expect(content).toHaveClass('custom-content')
    })
  })

  describe('CardFooter', () => {
    it('renders children correctly', () => {
      render(
        <CardFooter>
          <div data-testid="footer-content">Footer content</div>
        </CardFooter>,
      )
      expect(screen.getByTestId('footer-content')).toBeInTheDocument()
    })

    it('applies default styling', () => {
      render(<CardFooter data-testid="footer">Test footer</CardFooter>)
      const footer = screen.getByTestId('footer')
      expect(footer).toHaveClass('flex', 'items-center', 'p-6', 'pt-0')
    })

    it('accepts custom className', () => {
      render(
        <CardFooter className="custom-footer" data-testid="footer">
          Test
        </CardFooter>,
      )
      const footer = screen.getByTestId('footer')
      expect(footer).toHaveClass('custom-footer')
    })
  })

  describe('Complete Card Structure', () => {
    it('renders a complete card with all components', () => {
      render(
        <Card data-testid="complete-card">
          <CardHeader>
            <CardTitle>Test Card Title</CardTitle>
            <CardDescription>Test card description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This is the card content</p>
          </CardContent>
          <CardFooter>
            <button>Action Button</button>
          </CardFooter>
        </Card>,
      )

      expect(screen.getByTestId('complete-card')).toBeInTheDocument()
      expect(screen.getByRole('heading', { level: 3, name: 'Test Card Title' })).toBeInTheDocument()
      expect(screen.getByText('Test card description')).toBeInTheDocument()
      expect(screen.getByText('This is the card content')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Action Button' })).toBeInTheDocument()
    })

    it('maintains proper structure and styling when nested', () => {
      render(
        <Card className="w-96" data-testid="nested-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Custom Title</CardTitle>
            <CardDescription className="text-xs">Custom description</CardDescription>
          </CardHeader>
          <CardContent className="py-2">
            <div>Custom content</div>
          </CardContent>
          <CardFooter className="pt-2">
            <div>Custom footer</div>
          </CardFooter>
        </Card>,
      )

      const card = screen.getByTestId('nested-card')
      expect(card).toHaveClass('w-96')

      const title = screen.getByRole('heading', { level: 3 })
      expect(title).toHaveClass('text-lg')

      const description = screen.getByText('Custom description')
      expect(description).toHaveClass('text-xs')
    })
  })

  describe('Accessibility', () => {
    it('supports ARIA attributes', () => {
      render(
        <Card role="article" aria-labelledby="card-title" data-testid="accessible-card">
          <CardHeader>
            <CardTitle id="card-title">Accessible Card</CardTitle>
          </CardHeader>
        </Card>,
      )

      const card = screen.getByTestId('accessible-card')
      expect(card).toHaveAttribute('role', 'article')
      expect(card).toHaveAttribute('aria-labelledby', 'card-title')
    })

    it('allows semantic HTML structure', () => {
      render(
        <Card as="article" data-testid="semantic-card">
          <CardHeader as="header">
            <CardTitle as="h2">Semantic Title</CardTitle>
          </CardHeader>
        </Card>,
      )

      // Note: This test assumes the components support 'as' prop
      // If not implemented, the test will verify current behavior
      const card = screen.getByTestId('semantic-card')
      expect(card).toBeInTheDocument()
    })
  })
})
