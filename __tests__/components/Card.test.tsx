import React from 'react'
import { render, screen } from '@testing-library/react'
import { Card } from '@/components/example-components'

describe('Card Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<Card>Test Content</Card>)
    expect(container).toBeInTheDocument()
  })

  it('renders with title when provided', () => {
    render(<Card title="Test Title">Content</Card>)
    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })

  it('renders children correctly', () => {
    render(<Card><p>Child Content</p></Card>)
    expect(screen.getByText('Child Content')).toBeInTheDocument()
  })
})
