# Arquitetura do MVP-POS (Weather App)

## Diagrama de Arquitetura

```mermaid
graph TB
    subgraph Client["Frontend - React + Vite"]
        direction TB
        App["App.jsx<br/>Componente Principal"]
        SearchBar["SearchBar.jsx<br/>Componente de Busca"]
        WeatherCard["WeatherCard.jsx<br/>Componente de Exibição"]
        State["State Management<br/>useState/useEffect"]
    end

    subgraph Data["Camada de Dados"]
        Cities["cities.js<br/>Lista de Cidades SC"]
        Axios["Axios<br/>HTTP Client"]
    end

    subgraph External["Serviços Externos"]
        OpenWeatherAPI["OpenWeatherMap API<br/>Dados Meteorológicos"]
    end

    subgraph Build["Build & Dev"]
        Vite["Vite<br/>Bundler"]
        Tailwind["Tailwind CSS<br/>Estilização"]
        Vitest["Vitest<br/>Testes"]
    end

    App --> SearchBar
    App --> WeatherCard
    App --> State
    State --> Axios
    Axios --> OpenWeatherAPI
    App --> Cities
    SearchBar --> Cities
    Vite --> App
    Vite --> Tailwind
    Vitest --> App
    Vitest --> SearchBar
    Vitest --> WeatherCard

    style Client fill:#e1f5fe,stroke:#01579b
    style Data fill:#e8f5e9,stroke:#2e7d32
    style External fill:#fff3e0,stroke:#e65100
    style Build fill:#f3e5f5,stroke:#7b1fa2
```

## Descrição dos Componentes

| Camada | Componente | Descrição |
|--------|------------|-----------|
| **Client** | `App.jsx` | Componente principal que gerencia estado e requisições |
| **Client** | `SearchBar.jsx` | Componente de busca de cidades |
| **Client** | `WeatherCard.jsx` | Exibição dos dados meteorológicos |
| **Data** | `cities.js` | Lista estática de cidades de Santa Catarina |
| **External** | OpenWeatherMap API | API externa para dados climáticos |
| **Build** | Vite | Bundler para desenvolvimento e build |
| **Build** | Tailwind CSS | Framework de estilização |
| **Build** | Vitest | Framework de testes |

## Fluxo de Dados

1. Usuário interage com `SearchBar` para buscar uma cidade
2. `App.jsx` faz requisição via **Axios** para a **OpenWeatherMap API**
3. Dados retornados são armazenados no estado local
4. `WeatherCard` renderiza as informações para o usuário

## Estrutura de Arquivos

```
src/
├── App.jsx              # Componente principal
├── main.jsx             # Entry point React
├── index.css            # Estilos globais (Tailwind)
├── components/
│   ├── SearchBar.jsx    # Componente de busca
│   └── WeatherCard.jsx  # Card de exibição do clima
├── data/
│   └── cities.js        # Lista de cidades SC
└── test/
    ├── App.test.jsx
    ├── SearchBar.test.jsx
    ├── WeatherCard.test.jsx
    └── setupTests.js
```