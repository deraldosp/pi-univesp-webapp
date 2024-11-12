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