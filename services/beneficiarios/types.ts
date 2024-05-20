import type { IUser } from "../users/types";

export interface IBeneficiario {
  id: number;
  nome: string;
  rg: string;
  cpf: string;
  data_nascimento: string;
  genero: string;
  estado_civel: string;
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
  cep: string;
  telefone: string;
  email: string;
  numero_dependentes: number;
  inicio_beneficio?: string;
  termino_beneficio?: string;
  total_beneficios_recebidos: number;
  last_benefit?: any;
  ultimo_beneficio?: any;
  created_by?: IUser;
  created_at?: string;
  updated_at?: string;
}

export interface IPaginate {
  perPage?: number;
  page?: number
}