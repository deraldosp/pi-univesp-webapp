import type { IUser } from "../users/types";

export interface IDoador {
  id: number|null;
  nome: string;
  razao_social: string|null;
  cnpj_cpf: string;
  cep: string;
  endereco: string;
  bairro: string;
  cidade: string;
  uf: string;
  telefone: string|null;
  email: string;
  data_ult_doacao?: any;
  valor_ult_doacao?: number;
  created_at?: string;
  updated_at?: string;
}

export interface IPaginate {
  perPage?: number;
  page?: number
}