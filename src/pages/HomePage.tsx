import { Link } from 'react-router-dom'
import { useEstados } from '../hooks/useEstados'

export function HomePage() {
  const { data: estados } = useEstados()

  return (
    <div className="space-y-12">
      <section className="grid items-center gap-8 md:grid-cols-2">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800">
            Estados e municípios do Brasil em um só lugar
          </h1>
          <p className="mt-4 leading-relaxed text-neutral-600">
            O território brasileiro é dividido em 27 unidades federativas: 26
            estados e o Distrito Federal. Os estados são, segundo definição do
            Instituto Brasileiro de Geografia e Estatística (IBGE), entidades
            autônomas que possuem seus próprios governos e constituições.
            Juntos, formam a República Federativa do Brasil.
          </p>
          <div className="mt-6 flex gap-3">
            <Link
              to="/estados"
              className="rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-700"
            >
              Explorar estados
            </Link>
            <Link
              to="/municipios"
              className="rounded-lg border border-brand-600 px-5 py-2.5 text-sm font-medium text-brand-700 hover:bg-brand-50"
            >
              Buscar municípios
            </Link>
          </div>
        </div>
        <img
          src="/imgs/estados-do-brasil.jpg"
          alt="Mapa dos estados do Brasil"
          className="w-full rounded-2xl shadow-md"
        />
      </section>

      <section>
        <h2 className="text-xl font-semibold text-neutral-800">
          Unidades federativas
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {(estados ?? []).map((estado) => (
            <Link
              key={estado.id}
              to={`/estados/${estado.sigla.toLowerCase()}`}
              className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-sm text-neutral-700 hover:border-brand-600 hover:text-brand-700"
            >
              {estado.nome} — {estado.sigla}
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
