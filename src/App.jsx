import { useState, useEffect } from 'react'
import axios from 'axios'
import SearchBar from './components/SearchBar'
import WeatherCard from './components/WeatherCard'
import { CITIES_SC } from './data/cities'

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || 'SUA_CHAVE_API_AQUI'
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

function App() {
  const [weatherData, setWeatherData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchCity, setSearchCity] = useState('')

  const fetchWeather = async (city) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await axios.get(`${BASE_URL}/weather`, {
        params: {
          q: `${city},BR`,
          appid: API_KEY,
          units: 'metric',
          lang: 'pt_br'
        }
      })
      
      setWeatherData(prev => ({
        ...prev,
        [city]: response.data
      }))
    } catch (err) {
      setError(`Erro ao buscar dados para ${city}: ${err.response?.data?.message || err.message}`)
    } finally {
      setLoading(false)
    }
  }

  const fetchAllCitiesWeather = async () => {
    setLoading(true)
    setError(null)
    
    const results = {}
    
    for (const city of CITIES_SC) {
      try {
        const response = await axios.get(`${BASE_URL}/weather`, {
          params: {
            q: `${city},BR`,
            appid: API_KEY,
            units: 'metric',
            lang: 'pt_br'
          }
        })
        results[city] = response.data
      } catch (err) {
        console.error(`Erro ao buscar ${city}:`, err.message)
      }
    }
    
    setWeatherData(results)
    setLoading(false)
  }

  useEffect(() => {
    fetchAllCitiesWeather()
  }, [])

  const handleSearch = (city) => {
    setSearchCity(city)
    if (city && !weatherData[city]) {
      fetchWeather(city)
    }
  }

  const displayedCities = searchCity 
    ? CITIES_SC.filter(city => city.toLowerCase().includes(searchCity.toLowerCase()))
    : CITIES_SC

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            🌤️ Clima SC
          </h1>
          <p className="text-blue-200 text-lg">
            Previsão do Tempo em Santa Catarina
          </p>
        </header>

        <SearchBar onSearch={handleSearch} />

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 p-4 rounded-lg mb-6 text-center">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {displayedCities.map(city => (
              <WeatherCard 
                key={city} 
                city={city} 
                data={weatherData[city]} 
              />
            ))}
          </div>
        )}

        {!loading && displayedCities.length === 0 && (
          <div className="text-center text-blue-200 py-10">
            <p className="text-xl">Nenhuma cidade encontrada</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App