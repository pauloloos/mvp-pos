# 🌤️ Clima SC - Previsão do Tempo em Santa Catarina

Aplicação web frontend que consome dados da API OpenWeatherMap para exibir informações meteorológicas das principais cidades de Santa Catarina.

## 🚀 Tecnologias Utilizadas

- **React** - Framework JavaScript para construção de interfaces
- **Vite** - Build tool rápido para desenvolvimento
- **Tailwind CSS** - Framework de estilização
- **Axios** - Cliente HTTP para chamadas de API

## 📋 Pré-requisitos

- Node.js 18+ instalado
- Uma chave da API OpenWeatherMap (gratuita)

## 🔧 Configuração

1. Clone o repositório e instale as dependências:

```bash
npm install
```

2. Crie um arquivo `.env` na raiz do projeto com sua chave da API:

```env
VITE_OPENWEATHER_API_KEY=sua_chave_aqui
```

3. Execute o servidor de desenvolvimento:

```bash
npm run dev
```

4. Acesse `http://localhost:3000`

## 📦 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Build de produção
- `npm run preview` - Preview do build de produção

## 🎯 Funcionalidades

- Exibição de temperatura atual em Celsius
- Porcentagem de umidade
- Velocidade do vento
- Descrição do clima
- Busca por cidades
- Design responsivo
- Tema visual moderno com gradiente

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── SearchBar.jsx    # Componente de busca
│   └── WeatherCard.jsx  # Card de informações climáticas
├── data/
│   └── cities.js        # Lista de cidades de SC
├── App.jsx              # Componente principal
├── main.jsx             # Entry point
└── index.css            # Estilos globais
```

## 🔑 Obtendo a API Key

1. Acesse [OpenWeatherMap API](https://openweathermap.org/api)
2. Crie uma conta gratuita
3. Gere uma API Key no painel do usuário
4. Use a chave no arquivo `.env`

---

Desenvolvido para o curso MVP POS
