import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import SearchBar from '../components/SearchBar'

describe('SearchBar', () => {
  it('deve renderizar o input e o botão de busca', () => {
    render(<SearchBar onSearch={() => {}} />)
    
    expect(screen.getByPlaceholderText('Buscar cidade...')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /buscar/i })).toBeInTheDocument()
  })

  it('deve atualizar o valor do input ao digitar', () => {
    render(<SearchBar onSearch={() => {}} />)
    
    const input = screen.getByPlaceholderText('Buscar cidade...')
    fireEvent.change(input, { target: { value: 'Florianópolis' } })
    
    expect(input.value).toBe('Florianópolis')
  })

  it('deve chamar onSearch com o valor correto ao submeter o formulário', () => {
    const mockOnSearch = vi.fn()
    render(<SearchBar onSearch={mockOnSearch} />)
    
    const input = screen.getByPlaceholderText('Buscar cidade...')
    const button = screen.getByRole('button', { name: /buscar/i })
    
    fireEvent.change(input, { target: { value: 'Blumenau' } })
    fireEvent.click(button)
    
    expect(mockOnSearch).toHaveBeenCalledWith('Blumenau')
  })

  it('não deve chamar onSearch se o input estiver vazio', () => {
    const mockOnSearch = vi.fn()
    render(<SearchBar onSearch={mockOnSearch} />)
    
    const button = screen.getByRole('button', { name: /buscar/i })
    fireEvent.click(button)
    
    expect(mockOnSearch).not.toHaveBeenCalled()
  })

  it('deve remover espaços extras antes de enviar', () => {
    const mockOnSearch = vi.fn()
    render(<SearchBar onSearch={mockOnSearch} />)
    
    const input = screen.getByPlaceholderText('Buscar cidade...')
    const button = screen.getByRole('button', { name: /buscar/i })
    
    fireEvent.change(input, { target: { value: '  Joinville  ' } })
    fireEvent.click(button)
    
    expect(mockOnSearch).toHaveBeenCalledWith('Joinville')
  })

  it('deve mostrar o botão de limpar quando há texto no input', () => {
    render(<SearchBar onSearch={() => {}} />)
    
    const input = screen.getByPlaceholderText('Buscar cidade...')
    fireEvent.change(input, { target: { value: 'Teste' } })
    
    expect(screen.getByRole('button', { name: /✕/i })).toBeInTheDocument()
  })

  it('deve limpar o input e chamar onSearch com string vazia ao clicar em limpar', () => {
    const mockOnSearch = vi.fn()
    render(<SearchBar onSearch={mockOnSearch} />)
    
    const input = screen.getByPlaceholderText('Buscar cidade...')
    fireEvent.change(input, { target: { value: 'Teste' } })
    
    const clearButton = screen.getByRole('button', { name: /✕/i })
    fireEvent.click(clearButton)
    
    expect(input.value).toBe('')
    expect(mockOnSearch).toHaveBeenCalledWith('')
  })

  it('deve submeter o formulário ao pressionar Enter', () => {
    const mockOnSearch = vi.fn()
    render(<SearchBar onSearch={mockOnSearch} />)
    
    const input = screen.getByPlaceholderText('Buscar cidade...')
    fireEvent.change(input, { target: { value: 'Criciúma' } })
    fireEvent.submit(input)
    
    expect(mockOnSearch).toHaveBeenCalledWith('Criciúma')
  })
})