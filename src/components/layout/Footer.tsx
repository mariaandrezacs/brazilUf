export function Footer() {
  return (
    <footer className="mt-auto bg-brand-800 text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-8 sm:flex-row sm:justify-between">
        <span className="text-lg font-bold tracking-wide">BrazilUF</span>
        <p className="text-sm text-brand-100">
          Dados fornecidos pela{' '}
          <a
            href="https://servicodados.ibge.gov.br/api/docs/localidades"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white"
          >
            API de localidades do IBGE
          </a>
          .
        </p>
      </div>
    </footer>
  )
}
