import { useState } from 'react'

function SearchBar({ onSearch }) {
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputValue.trim()) {
      onSearch(inputValue.trim())
    }
  }

  const handleClear = () => {
    setInputValue('')
    onSearch('')
  }

  return (
    <div className="max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Buscar cidade..."
          className="flex-1 px-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 
                     text-white placeholder-blue-200 focus:outline-none focus:ring-2 
                     focus:ring-blue-300 focus:border-transparent transition-all"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold 
                     rounded-lg transition-colors shadow-lg"
        >
          Buscar
        </button>
        {inputValue && (
          <button
            type="button"
            onClick={handleClear}
            className="px-4 py-3 bg-white/20 hover:bg-white/30 text-white rounded-lg 
                       transition-colors"
          >
            ✕
          </button>
        )}
      </form>
    </div>
  )
}

export default SearchBar