import { useQuery } from '@tanstack/react-query'
import { ibge } from '../services/ibge'

const DIA_EM_MS = 24 * 60 * 60 * 1000

export function useEstados() {
  return useQuery({
    queryKey: ['estados'],
    queryFn: ibge.estados,
    staleTime: DIA_EM_MS,
  })
}

export function useEstado(uf: string) {
  return useQuery({
    queryKey: ['estado', uf],
    queryFn: () => ibge.estado(uf),
    staleTime: DIA_EM_MS,
  })
}
