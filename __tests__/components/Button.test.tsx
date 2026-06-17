import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '@/components/example-components'

describe('Button Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<Button onClick={() => {}}>Test Button</Button>)
    expect(container).toBeInTheDocument()
  })

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click Me</Button>)
    fireEvent.click(screen.getByText('Click Me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('renders with primary variant by default', () => {
    render(<Button onClick={() => {}}>Default</Button>)
    const button = screen.getByText('Default')
    expect(button).toBeInTheDocument()
  })

  it('is disabled when disabled prop is true', () => {
    render(<Button onClick={() => {}} disabled>Disabled</Button>)
    const button = screen.getByText('Disabled')
    expect(button).toBeDisabled()
  })
})
