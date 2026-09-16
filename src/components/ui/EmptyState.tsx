export function EmptyState({ message = 'Nenhum resultado encontrado.' }: { message?: string }) {
  return <p className="py-16 text-center text-sm text-neutral-500">{message}</p>
}
