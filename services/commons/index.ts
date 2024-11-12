import type { $Fetch } from 'ofetch';
import type { IServiceLaravelPaginate } from '../types';
import type { IPaginate } from './types';


export default class CommonsService {
  private fetch: $Fetch;

  constructor(fetch: any) {
    this.fetch = fetch
  }

  async listaTiposDoacoes() {
    const result = await this.fetch('/tipos_doacoes', {
      method: 'GET'
    })
    return result
  }

  async listaUnidadesPorEntidade(entidadeId: number) {
    const result = await this.fetch(`/entidade_beneficente/${entidadeId}/unidades`, {
      method: 'GET'
    })
    return result
  }

  async listaBeneficios() {
    const result = await this.fetch('/beneficios', {
      method: 'GET'
    })
    return result
  }
}