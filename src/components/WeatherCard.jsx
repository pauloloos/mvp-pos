function WeatherCard({ city, data }) {
  if (!data) {
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 
                      animate-pulse">
        <div className="h-6 bg-white/20 rounded w-3/4 mb-4"></div>
        <div className="h-20 bg-white/20 rounded w-full"></div>
      </div>
    )
  }

  const { main, weather, wind, name, sys } = data
  const temperature = Math.round(main.temp)
  const feelsLike = Math.round(main.feels_like)
  const humidity = main.humidity
  const description = weather[0]?.description || ''
  const icon = weather[0]?.icon
  const windSpeed = wind.speed
  const country = sys.country

  const getWeatherEmoji = (iconCode) => {
    const iconMap = {
      '01d': '☀️', '01n': '🌙',
      '02d': '⛅', '02n': '☁️',
      '03d': '☁️', '03n': '☁️',
      '04d': '☁️', '04n': '☁️',
      '09d': '🌧️', '09n': '🌧️',
      '10d': '🌦️', '10n': '🌧️',
      '11d': '⛈️', '11n': '⛈️',
      '13d': '❄️', '13n': '❄️',
      '50d': '🌫️', '50n': '🌫️',
    }
    return iconMap[iconCode] || '🌤️'
  }

  const getTemperatureColor = (temp) => {
    if (temp < 10) return 'text-blue-300'
    if (temp < 20) return 'text-green-300'
    if (temp < 28) return 'text-yellow-300'
    return 'text-orange-400'
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 
                    hover:bg-white/20 transition-all duration-300 shadow-xl">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold text-white">{name}</h3>
          <span className="text-blue-200 text-sm">{country}</span>
        </div>
        <span className="text-5xl">{getWeatherEmoji(icon)}</span>
      </div>

      <div className="mb-4">
        <p className={`text-5xl font-bold ${getTemperatureColor(temperature)}`}>
          {temperature}°C
        </p>
        <p className="text-blue-100 capitalize mt-1">{description}</p>
        <p className="text-blue-200 text-sm mt-1">
          Sensação térmica: {feelsLike}°C
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
        <div className="text-center">
          <p className="text-blue-200 text-sm">💧 Umidade</p>
          <p className="text-white font-semibold text-lg">{humidity}%</p>
        </div>
        <div className="text-center">
          <p className="text-blue-200 text-sm">💨 Vento</p>
          <p className="text-white font-semibold text-lg">{windSpeed} m/s</p>
        </div>
      </div>
    </div>
  )
}

export default WeatherCard