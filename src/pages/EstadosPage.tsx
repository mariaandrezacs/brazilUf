import { useMemo, useState } from 'react'
import { useEstados } from '../hooks/useEstados'
import { useDebounce } from '../hooks/useDebounce'
import { normalize } from '../utils/normalize'
import { EstadoCard } from '../components/EstadoCard'
import { SearchBar } from '../components/SearchBar'
import { FilterSelect } from '../components/FilterSelect'
import { LoadingState } from '../components/ui/LoadingState'
import { ErrorState } from '../components/ui/ErrorState'
import { EmptyState } from '../components/ui/EmptyState'

const REGIOES = ['Norte', 'Nordeste', 'Centro-Oeste', 'Sudeste', 'Sul']

export function EstadosPage() {
  const { data: estados, isLoading, isError, refetch } = useEstados()
  const [busca, setBusca] = useState('')
  const [regiao, setRegiao] = useState('')
  const termo = useDebounce(busca)

  const filtrados = useMemo(() => {
    const q = normalize(termo.trim())
    return (estados ?? []).filter((estado) => {
      const matchBusca =
        !q ||
        normalize(estado.nome).includes(q) ||
        normalize(estado.sigla).includes(q)
      const matchRegiao = !regiao || estado.regiao.nome === regiao
      return matchBusca && matchRegiao
    })
  }, [estados, termo, regiao])

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-800">Estados</h1>
      <p className="mt-1 text-sm text-neutral-500">
        {estados?.length ?? 27} unidades federativas
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <SearchBar
          value={busca}
          onChange={setBusca}
          placeholder="Buscar por nome ou sigla..."
        />
        <FilterSelect
          value={regiao}
          onChange={setRegiao}
          placeholder="Todas as regiões"
          options={REGIOES.map((r) => ({ value: r, label: r }))}
        />
      </div>

      {isLoading && <LoadingState label="Carregando estados..." />}
      {isError && (
        <ErrorState
          message="Erro ao carregar a lista de estados."
          onRetry={() => refetch()}
        />
      )}
      {!isLoading && !isError && filtrados.length === 0 && <EmptyState />}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtrados.map((estado) => (
          <EstadoCard key={estado.id} estado={estado} />
        ))}
      </div>
    </div>
  )
}
