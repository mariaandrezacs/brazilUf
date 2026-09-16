export interface Regiao {
  id: number
  sigla: string
  nome: string
}

export interface Estado {
  id: number
  sigla: string
  nome: string
  regiao: Regiao
}

export interface Municipio {
  id: number
  nome: string
  microrregiao?: {
    mesorregiao?: {
      UF?: {
        id: number
        sigla: string
        nome: string
      }
    }
  }
}
