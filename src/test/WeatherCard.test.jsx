import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import WeatherCard from '../components/WeatherCard'

const mockWeatherData = {
  main: {
    temp: 22,
    feels_like: 20,
    humidity: 75
  },
  weather: [
    {
      description: 'nublado',
      icon: '04d'
    }
  ],
  wind: {
    speed: 3.5
  },
  name: 'Florianópolis',
  sys: {
    country: 'BR'
  }
}

describe('WeatherCard', () => {
  it('deve renderizar o estado de carregamento quando data é null', () => {
    render(<WeatherCard city="Florianópolis" data={null} />)
    
    const skeleton = document.querySelector('.animate-pulse')
    expect(skeleton).toBeInTheDocument()
  })

  it('deve renderizar o nome da cidade e país', () => {
    render(<WeatherCard city="Florianópolis" data={mockWeatherData} />)
    
    expect(screen.getByText('Florianópolis')).toBeInTheDocument()
    expect(screen.getByText('BR')).toBeInTheDocument()
  })

  it('deve renderizar a temperatura arredondada', () => {
    render(<WeatherCard city="Florianópolis" data={mockWeatherData} />)
    
    expect(screen.getByText('22°C')).toBeInTheDocument()
  })

  it('deve renderizar a sensação térmica', () => {
    render(<WeatherCard city="Florianópolis" data={mockWeatherData} />)
    
    expect(screen.getByText(/sensação térmica: 20°c/i)).toBeInTheDocument()
  })

  it('deve renderizar a descrição do clima', () => {
    render(<WeatherCard city="Florianópolis" data={mockWeatherData} />)
    
    expect(screen.getByText('nublado')).toBeInTheDocument()
  })

  it('deve renderizar a umidade', () => {
    render(<WeatherCard city="Florianópolis" data={mockWeatherData} />)
    
    expect(screen.getByText(/umidade/i)).toBeInTheDocument()
    expect(screen.getByText('75%')).toBeInTheDocument()
  })

  it('deve renderizar a velocidade do vento', () => {
    render(<WeatherCard city="Florianópolis" data={mockWeatherData} />)
    
    expect(screen.getByText(/vento/i)).toBeInTheDocument()
    expect(screen.getByText('3.5 m/s')).toBeInTheDocument()
  })

  it('deve aplicar a cor correta para temperatura fria (< 10°C)', () => {
    const coldData = {
      ...mockWeatherData,
      main: { ...mockWeatherData.main, temp: 5, feels_like: 3 }
    }
    render(<WeatherCard city="Lages" data={coldData} />)
    
    const tempElement = screen.getByText('5°C')
    expect(tempElement).toHaveClass('text-blue-300')
  })

  it('deve aplicar a cor correta para temperatura amena (10-19°C)', () => {
    const mildData = {
      ...mockWeatherData,
      main: { ...mockWeatherData.main, temp: 15, feels_like: 14 }
    }
    render(<WeatherCard city="Blumenau" data={mildData} />)
    
    const tempElement = screen.getByText('15°C')
    expect(tempElement).toHaveClass('text-green-300')
  })

  it('deve aplicar a cor correta para temperatura morna (20-27°C)', () => {
    const warmData = {
      ...mockWeatherData,
      main: { ...mockWeatherData.main, temp: 25, feels_like: 24 }
    }
    render(<WeatherCard city="Joinville" data={warmData} />)
    
    const tempElement = screen.getByText('25°C')
    expect(tempElement).toHaveClass('text-yellow-300')
  })

  it('deve aplicar a cor correta para temperatura quente (>= 28°C)', () => {
    const hotData = {
      ...mockWeatherData,
      main: { ...mockWeatherData.main, temp: 32, feels_like: 35 }
    }
    render(<WeatherCard city="Criciúma" data={hotData} />)
    
    const tempElement = screen.getByText('32°C')
    expect(tempElement).toHaveClass('text-orange-400')
  })

  it('deve renderizar emoji padrão quando ícone é desconhecido', () => {
    const unknownIconData = {
      ...mockWeatherData,
      weather: [{ description: 'teste', icon: 'unknown' }]
    }
    render(<WeatherCard city="Test" data={unknownIconData} />)
    
    expect(screen.getByText('🌤️')).toBeInTheDocument()
  })

  it('deve lidar com dados mínimos (apenas temperatura)', () => {
    const minimalData = {
      main: { temp: 20, feels_like: 18, humidity: 50 },
      weather: [{ description: 'céu limpo', icon: '01d' }],
      wind: { speed: 2 },
      name: 'Chapecó',
      sys: { country: 'BR' }
    }
    
    render(<WeatherCard city="Chapecó" data={minimalData} />)
    
    expect(screen.getByText('Chapecó')).toBeInTheDocument()
    expect(screen.getByText('20°C')).toBeInTheDocument()
  })
})