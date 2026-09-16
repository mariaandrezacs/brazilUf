interface ErrorStateProps {
  message?: string
  onRetry?: () => void
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 py-16 text-center">
      <p className="text-sm text-red-600">
        {message ?? 'Não foi possível carregar os dados.'}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
        >
          Tentar novamente
        </button>
      )}
    </div>
  )
}
