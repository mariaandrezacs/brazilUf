import type { Estado, Municipio } from '../types/ibge'

const BASE_URL = 'https://servicodados.ibge.gov.br/api/v1/localidades'

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`)
  if (!res.ok) {
    throw new Error(`Erro ao consultar o IBGE (${res.status})`)
  }
  return res.json() as Promise<T>
}

export const ibge = {
  estados: () => get<Estado[]>('/estados?orderBy=nome'),
  estado: (uf: string) => get<Estado>(`/estados/${uf}`),
  municipiosPorEstado: (uf: string) =>
    get<Municipio[]>(`/estados/${uf}/municipios?orderBy=nome`),
  municipios: () => get<Municipio[]>('/municipios?orderBy=nome'),
}
