import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Input } from '@/components/example-components'

describe('Input Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<Input label="Test Label" value="" onChange={() => {}} />)
    expect(container).toBeInTheDocument()
  })

  it('renders placeholder when provided', () => {
    render(
      <Input 
        label="Test" 
        value="" 
        onChange={() => {}} 
        placeholder="Enter text" 
      />
    )
    const input = screen.getByPlaceholderText('Enter text')
    expect(input).toBeInTheDocument()
  })

  it('calls onChange handler when value changes', () => {
    const handleChange = jest.fn()
    render(
      <Input 
        label="Test" 
        value="" 
        onChange={handleChange} 
      />
    )
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'test value' } })
    expect(handleChange).toHaveBeenCalledWith('test value')
  })

  it('displays error message when provided', () => {
    render(
      <Input 
        label="Test" 
        value="" 
        onChange={() => {}} 
        error="This field is required" 
      />
    )
    const error = screen.getByText('This field is required')
    expect(error).toBeInTheDocument()
  })
})
