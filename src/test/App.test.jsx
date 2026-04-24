import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import axios from 'axios'
import App from '../App'

// Mock do axios - deve vir antes de importar o App
vi.mock('axios')

describe('App - Integração', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Mock que sempre retorna dados válidos para qualquer chamada
    axios.get.mockResolvedValue({
      data: {
        name: 'Test City',
        main: { temp: 20, feels_like: 18, humidity: 75 },
        weather: [{ description: 'céu limpo', icon: '01d' }],
        wind: { speed: 3 },
        sys: { country: 'BR' }
      }
    })
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  it('deve renderizar o título principal', async () => {
    render(<App />)
    
    expect(screen.getByText('🌤️ Clima SC')).toBeInTheDocument()
    expect(screen.getByText(/previsão do tempo em santa catarina/i)).toBeInTheDocument()
  })

  it('deve renderizar o componente SearchBar', async () => {
    render(<App />)
    
    expect(screen.getByPlaceholderText('Buscar cidade...')).toBeInTheDocument()
  })

  it('deve fazer chamadas à API ao iniciar', async () => {
    render(<App />)
    
    // Espera que axios.get seja chamado pelo menos uma vez
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalled()
    }, { timeout: 10000 })
    
    // Verifica que a URL da API foi chamada
    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining('api.openweathermap.org'),
      expect.any(Object)
    )
  })

  it('deve passar parâmetros corretos para a API', async () => {
    render(<App />)
    
    await waitFor(() => {
      const calls = axios.get.mock.calls
      const lastCall = calls[calls.length - 1]
      
      expect(lastCall[0]).toBe('https://api.openweathermap.org/data/2.5/weather')
      expect(lastCall[1]).toEqual(
        expect.objectContaining({
          params: expect.objectContaining({
            units: 'metric',
            lang: 'pt_br'
          })
        })
      )
    }, { timeout: 10000 })
  })
})