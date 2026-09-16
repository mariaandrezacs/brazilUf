import { useQuery } from '@tanstack/react-query'
import { ibge } from '../services/ibge'

const DIA_EM_MS = 24 * 60 * 60 * 1000

export function useMunicipiosPorEstado(uf: string) {
  return useQuery({
    queryKey: ['municipios', 'estado', uf],
    queryFn: () => ibge.municipiosPorEstado(uf),
    staleTime: DIA_EM_MS,
  })
}

export function useTodosMunicipios(enabled = true) {
  return useQuery({
    queryKey: ['municipios', 'todos'],
    queryFn: ibge.municipios,
    staleTime: DIA_EM_MS,
    enabled,
  })
}
