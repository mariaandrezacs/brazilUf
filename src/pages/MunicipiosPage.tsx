import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useEstados } from '../hooks/useEstados'
import { useTodosMunicipios } from '../hooks/useMunicipios'
import { useDebounce } from '../hooks/useDebounce'
import { normalize } from '../utils/normalize'
import type { Municipio } from '../types/ibge'
import { SearchBar } from '../components/SearchBar'
import { FilterSelect } from '../components/FilterSelect'
import { Pagination } from '../components/Pagination'
import { LoadingState } from '../components/ui/LoadingState'
import { ErrorState } from '../components/ui/ErrorState'
import { EmptyState } from '../components/ui/EmptyState'

const POR_PAGINA = 50

function ufDoMunicipio(m: Municipio): string {
  return m.microrregiao?.mesorregiao?.UF?.sigla ?? ''
}

export function MunicipiosPage() {
  const estadosQuery = useEstados()
  const municipiosQuery = useTodosMunicipios()

  const [busca, setBusca] = useState('')
  const [uf, setUf] = useState('')
  const [page, setPage] = useState(1)
  const termo = useDebounce(busca)

  const filtrados = useMemo(() => {
    const q = normalize(termo.trim())
    return (municipiosQuery.data ?? []).filter((m) => {
      const matchBusca = !q || normalize(m.nome).includes(q)
      const matchUf = !uf || ufDoMunicipio(m) === uf
      return matchBusca && matchUf
    })
  }, [municipiosQuery.data, termo, uf])

  const totalPaginas = Math.ceil(filtrados.length / POR_PAGINA)
  const paginaAtual = Math.min(page, Math.max(totalPaginas, 1))
  const paginados = filtrados.slice(
    (paginaAtual - 1) * POR_PAGINA,
    paginaAtual * POR_PAGINA,
  )

  const resetar = () => setPage(1)

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-800">Municípios</h1>
      <p className="mt-1 text-sm text-neutral-500">
        Busque entre os mais de 5.500 municípios brasileiros
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <SearchBar
          value={busca}
          onChange={(v) => {
            setBusca(v)
            resetar()
          }}
          placeholder="Buscar município..."
        />
        <FilterSelect
          value={uf}
          onChange={(v) => {
            setUf(v)
            resetar()
          }}
          placeholder="Todos os estados"
          options={(estadosQuery.data ?? []).map((e) => ({
            value: e.sigla,
            label: e.nome,
          }))}
        />
      </div>

      {municipiosQuery.isLoading && (
        <LoadingState label="Carregando municípios..." />
      )}
      {municipiosQuery.isError && (
        <ErrorState
          message="Erro ao carregar a lista de municípios."
          onRetry={() => municipiosQuery.refetch()}
        />
      )}
      {!municipiosQuery.isLoading &&
        !municipiosQuery.isError &&
        filtrados.length === 0 && <EmptyState />}

      {!municipiosQuery.isLoading && filtrados.length > 0 && (
        <>
          <p className="mt-4 text-sm text-neutral-500">
            {filtrados.length} município(s) encontrado(s)
          </p>
          <ul className="mt-2 divide-y divide-neutral-100 rounded-xl border border-neutral-200 bg-white">
            {paginados.map((m) => {
              const sigla = ufDoMunicipio(m)
              return (
                <li
                  key={m.id}
                  className="flex items-center justify-between px-4 py-2.5 text-sm"
                >
                  <span className="text-neutral-800">{m.nome}</span>
                  <span className="flex items-center gap-3 text-xs text-neutral-400">
                    <span>IBGE {m.id}</span>
                    {sigla && (
                      <Link
                        to={`/estados/${sigla.toLowerCase()}`}
                        className="rounded bg-brand-50 px-1.5 py-0.5 font-bold text-brand-700 hover:underline"
                      >
                        {sigla}
                      </Link>
                    )}
                  </span>
                </li>
              )
            })}
          </ul>
          <Pagination
            page={paginaAtual}
            totalPages={totalPaginas}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  )
}
