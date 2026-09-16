# BrazilUF

Sistema para gerenciamento e organização de informações sobre estados e municípios do Brasil, oferecendo uma interface intuitiva e funcionalidades avançadas para pesquisa e consulta de dados.

Os dados são consumidos em tempo real da [API de localidades do IBGE](https://servicodados.ibge.gov.br/api/docs/localidades).

## Funcionalidades

- **Estados** — listagem das 27 unidades federativas com busca por nome/sigla e filtro por região
- **Detalhe do estado** — capital, região, código IBGE e lista de municípios com busca e paginação
- **Municípios** — busca global em mais de 5.500 municípios com filtro por UF
- Busca insensível a acentos e maiúsculas, com debounce
- Interface responsiva

## Tecnologias utilizadas

- ⚛️ React 19
- 🔷 TypeScript
- ⚡ Vite
- � Tailwind CSS
- 🔄 TanStack Query (cache das consultas à API)
- 🧭 React Router

## Como executar

```bash
npm install
npm run dev
```

A aplicação fica disponível em `http://localhost:5173`.

## Scripts

| Comando | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção (`dist/`) |
| `npm run preview` | Preview do build de produção |
| `npm run lint` | Análise estática com oxlint |

## Estrutura

```
src/
├── types/        # Tipos das entidades do IBGE (Estado, Municipio, Regiao)
├── services/     # Cliente da API do IBGE
├── hooks/        # Hooks de dados (React Query) e useDebounce
├── components/   # Componentes reutilizáveis e layout
├── pages/        # Home, Estados, Detalhe do estado, Municípios
├── data/         # capitais.json (capitais das UFs)
└── utils/        # Normalização de texto para busca
```
