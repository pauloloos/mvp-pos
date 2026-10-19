import { describe, it, expect, vi, beforeEach } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import App from '../App'
import { CITIES_SC } from '../data/cities'

vi.mock('axios', () => ({
  default: {
    get: vi.fn()
  }
}))

import axios from 'axios'

const createWeatherData = (name) => ({
  name,
  main: { temp: 20, feels_like: 18, humidity: 75 },
  weather: [{ description: 'céu limpo', icon: '01d' }],
  wind: { speed: 3 },
  sys: { country: 'BR' }
})

const waitForInitialLoad = () => waitFor(() => {
  expect(document.querySelector('.animate-spin')).not.toBeInTheDocument()
})

const submitSearch = (city) => {
  fireEvent.change(screen.getByPlaceholderText('Buscar cidade...'), {
    target: { value: city }
  })
  fireEvent.click(screen.getByRole('button', { name: /buscar/i }))
}

describe('App - Integração com a API de clima', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    axios.get.mockImplementation(async (_url, config) => ({
      data: createWeatherData(config.params.q.replace(',BR', ''))
    }))
  })

  it('carrega e exibe dados válidos da API ao iniciar', async () => {
    render(<App />)

    await waitForInitialLoad()

    expect(screen.getByText('🌤️ Clima SC')).toBeInTheDocument()
    expect(screen.getByText('Florianópolis')).toBeInTheDocument()
    expect(screen.getAllByText('20°C')).toHaveLength(CITIES_SC.length)
    expect(screen.getAllByText('céu limpo')).toHaveLength(CITIES_SC.length)
  })

  it('consulta as cidades com os parâmetros esperados pela API', async () => {
    render(<App />)

    await waitForInitialLoad()

    expect(axios.get).toHaveBeenCalledTimes(CITIES_SC.length)
    expect(axios.get).toHaveBeenCalledWith(
      'https://api.openweathermap.org/data/2.5/weather',
      {
        params: expect.objectContaining({
          q: 'Florianópolis,BR',
          appid: expect.any(String),
          units: 'metric',
          lang: 'pt_br'
        })
      }
    )
  })

  it('não envia a busca à API quando o parâmetro da cidade está vazio', async () => {
    render(<App />)
    await waitForInitialLoad()
    const initialCallCount = axios.get.mock.calls.length

    submitSearch('   ')

    expect(axios.get).toHaveBeenCalledTimes(initialCallCount)
  })

  it('exibe uma mensagem quando a API rejeita a autenticação', async () => {
    axios.get.mockImplementation(async (_url, config) => {
      if (config.params.q === 'Cidade401,BR') {
        throw { response: { data: { message: 'Invalid API key' } } }
      }
      return { data: createWeatherData(config.params.q.replace(',BR', '')) }
    })
    render(<App />)
    await waitForInitialLoad()

    submitSearch('Cidade401')

    expect(await screen.findByText(/invalid api key/i)).toBeInTheDocument()
  })

  it('exibe uma mensagem quando há falha de comunicação com a API', async () => {
    axios.get.mockImplementation(async (_url, config) => {
      if (config.params.q === 'CidadeOffline,BR') {
        throw new Error('Network Error')
      }
      return { data: createWeatherData(config.params.q.replace(',BR', '')) }
    })
    render(<App />)
    await waitForInitialLoad()

    submitSearch('CidadeOffline')

    expect(await screen.findByText(/network error/i)).toBeInTheDocument()
  })

  it('informa erro quando a resposta da API não contém campos obrigatórios', async () => {
    axios.get.mockImplementation(async (_url, config) => {
      if (config.params.q === 'CidadeIncompleta,BR') {
        return { data: { main: { temp: 20 } } }
      }
      return { data: createWeatherData(config.params.q.replace(',BR', '')) }
    })
    render(<App />)
    await waitForInitialLoad()

    submitSearch('CidadeIncompleta')

    expect(await screen.findByText(/resposta inválida recebida da api/i)).toBeInTheDocument()
  })

  it('rejeita dados inconsistentes, como temperatura não numérica', async () => {
    axios.get.mockImplementation(async (_url, config) => {
      if (config.params.q === 'CidadeInconsistente,BR') {
        return {
          data: {
            ...createWeatherData('CidadeInconsistente'),
            main: { temp: 'quente', feels_like: 18, humidity: 75 }
          }
        }
      }
      return { data: createWeatherData(config.params.q.replace(',BR', '')) }
    })
    render(<App />)
    await waitForInitialLoad()

    submitSearch('CidadeInconsistente')

    expect(await screen.findByText(/resposta inválida recebida da api/i)).toBeInTheDocument()
  })

  it('informa falhas do serviço durante o carregamento inicial sem descartar os demais dados', async () => {
    axios.get.mockImplementation(async (_url, config) => {
      if (config.params.q === 'Florianópolis,BR') {
        throw { response: { status: 503, data: { message: 'Service Unavailable' } } }
      }
      return { data: createWeatherData(config.params.q.replace(',BR', '')) }
    })
    render(<App />)

    expect(await screen.findByText(/service unavailable/i)).toBeInTheDocument()
    expect(screen.getByText('Joinville')).toBeInTheDocument()
  })
})
