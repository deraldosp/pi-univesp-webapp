import type { $Fetch } from 'ofetch';
import type { IBeneficiario } from '../beneficiarios/types';
import type { IDistribuicao } from './types';

export default class DistribuicaoService {
  private fetch: $Fetch;

  constructor(fetch: any) {
    this.fetch = fetch
  }

  async takeBenefit(distribuicao: IDistribuicao) {
    const result = await this.fetch<IBeneficiario>('/distribuicao', {
      method: 'POST',
      body: distribuicao
    })
    return result
  }

}