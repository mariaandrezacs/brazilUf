import { Link } from 'react-router-dom'
import type { Estado } from '../types/ibge'
import capitais from '../data/capitais.json'

export function EstadoCard({ estado }: { estado: Estado }) {
  const capital = capitais[estado.sigla as keyof typeof capitais]?.capital

  return (
    <Link
      to={`/estados/${estado.sigla.toLowerCase()}`}
      className="group rounded-xl border border-neutral-200 bg-white p-4 transition-shadow hover:shadow-md"
    >
      <div className="flex items-start justify-between">
        <h3 className="font-semibold text-neutral-800 group-hover:text-brand-700">
          {estado.nome}
        </h3>
        <span className="rounded-md bg-brand-50 px-2 py-0.5 text-xs font-bold text-brand-700">
          {estado.sigla}
        </span>
      </div>
      <dl className="mt-3 space-y-1 text-sm text-neutral-600">
        {capital && (
          <div className="flex justify-between">
            <dt>Capital</dt>
            <dd className="font-medium">{capital}</dd>
          </div>
        )}
        <div className="flex justify-between">
          <dt>Região</dt>
          <dd className="font-medium">{estado.regiao.nome}</dd>
        </div>
      </dl>
    </Link>
  )
}
