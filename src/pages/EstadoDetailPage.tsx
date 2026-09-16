import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useEstado } from '../hooks/useEstados'
import { useMunicipiosPorEstado } from '../hooks/useMunicipios'
import { useDebounce } from '../hooks/useDebounce'
import { normalize } from '../utils/normalize'
import { SearchBar } from '../components/SearchBar'
import { Pagination } from '../components/Pagination'
import { LoadingState } from '../components/ui/LoadingState'
import { ErrorState } from '../components/ui/ErrorState'
import { EmptyState } from '../components/ui/EmptyState'
import capitais from '../data/capitais.json'

const POR_PAGINA = 50

export function EstadoDetailPage() {
  const { uf = '' } = useParams()
  const sigla = uf.toUpperCase()

  const estadoQuery = useEstado(sigla)
  const municipiosQuery = useMunicipiosPorEstado(sigla)

  const [busca, setBusca] = useState('')
  const [page, setPage] = useState(1)
  const termo = useDebounce(busca)

  const filtrados = useMemo(() => {
    const q = normalize(termo.trim())
    return (municipiosQuery.data ?? []).filter(
      (m) => !q || normalize(m.nome).includes(q),
    )
  }, [municipiosQuery.data, termo])

  const totalPaginas = Math.ceil(filtrados.length / POR_PAGINA)
  const paginaAtual = Math.min(page, Math.max(totalPaginas, 1))
  const paginados = filtrados.slice(
    (paginaAtual - 1) * POR_PAGINA,
    paginaAtual * POR_PAGINA,
  )

  if (estadoQuery.isError) {
    return (
      <ErrorState
        message={`Estado "${sigla}" não encontrado.`}
        onRetry={() => estadoQuery.refetch()}
      />
    )
  }

  const estado = estadoQuery.data
  const capital = capitais[sigla as keyof typeof capitais]?.capital

  return (
    <div>
      <Link
        to="/estados"
        className="text-sm text-brand-700 hover:underline"
      >
        ← Voltar para estados
      </Link>

      {estadoQuery.isLoading ? (
        <LoadingState />
      ) : (
        estado && (
          <div className="mt-4 rounded-xl border border-neutral-200 bg-white p-6">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold text-neutral-800">
                {estado.nome}
              </h1>
              <span className="rounded-md bg-brand-50 px-2 py-0.5 text-sm font-bold text-brand-700">
                {estado.sigla}
              </span>
            </div>
            <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
              {capital && (
                <div>
                  <dt className="text-neutral-500">Capital</dt>
                  <dd className="font-medium text-neutral-800">{capital}</dd>
                </div>
              )}
              <div>
                <dt className="text-neutral-500">Região</dt>
                <dd className="font-medium text-neutral-800">
                  {estado.regiao.nome}
                </dd>
              </div>
              <div>
                <dt className="text-neutral-500">Código IBGE</dt>
                <dd className="font-medium text-neutral-800">{estado.id}</dd>
              </div>
            </dl>
          </div>
        )
      )}

      <div className="mt-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-semibold text-neutral-800">
            Municípios
            {municipiosQuery.data && (
              <span className="ml-2 text-sm font-normal text-neutral-500">
                {filtrados.length} de {municipiosQuery.data.length}
              </span>
            )}
          </h2>
          <div className="sm:w-72">
            <SearchBar
              value={busca}
              onChange={(v) => {
                setBusca(v)
                setPage(1)
              }}
              placeholder="Buscar município..."
            />
          </div>
        </div>

        {municipiosQuery.isLoading && (
          <LoadingState label="Carregando municípios..." />
        )}
        {municipiosQuery.isError && (
          <ErrorState
            message="Erro ao carregar municípios."
            onRetry={() => municipiosQuery.refetch()}
          />
        )}
        {!municipiosQuery.isLoading &&
          !municipiosQuery.isError &&
          filtrados.length === 0 && <EmptyState />}

        <ul className="mt-4 divide-y divide-neutral-100 rounded-xl border border-neutral-200 bg-white">
          {paginados.map((m) => (
            <li
              key={m.id}
              className="flex items-center justify-between px-4 py-2.5 text-sm"
            >
              <span className="text-neutral-800">{m.nome}</span>
              <span className="text-xs text-neutral-400">IBGE {m.id}</span>
            </li>
          ))}
        </ul>

        <Pagination
          page={paginaAtual}
          totalPages={totalPaginas}
          onPageChange={setPage}
        />
      </div>
    </div>
  )
}
