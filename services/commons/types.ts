export interface ITipoDoacao {
  id: number;
  nome: string;
  descricao?: string;
  created_at?: string;
  updated_at?: string;
}

export interface IPaginate {
  perPage?: number;
  page?: number
}

export interface InputDoacao {
  doador_id: number;
  tipo_id: number;
  unidade_id: number;
  quantidade: number;
  valor: number;
  judicial: boolean;
  observacao?: string;
}
