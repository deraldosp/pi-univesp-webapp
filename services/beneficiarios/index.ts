import type { $Fetch } from 'ofetch';
import type { IServiceLaravelPaginate } from '../types';
import type { IBeneficiario, IPaginate } from './types';


export default class BeneficiarioService {
  private fetch: $Fetch;

  constructor(fetch: any) {
    this.fetch = fetch
  }

  async getBeneficiarios(paginate: IPaginate = { perPage: 10, page: 1 }, search?: string) {

    const withSearch = search ? { search: `nome|${search}` } : {};

    const result = await this.fetch<IServiceLaravelPaginate>('/beneficiario', {
      method: 'GET',
      query: {
        perpage: paginate.perPage,
        page: paginate.page,
        ...withSearch
      }
    })
    return result
  }

  async getBeneficiario(id: number) {
    const result = await this.fetch<IBeneficiario>(`/beneficiario/${id}`, {
      method: 'GET',
    })
    return result
  }

  async ceateBeneficiario(beneficiario: any) {
    const result = await this.fetch<IBeneficiario>(`/beneficiario`, {
      method: 'POST',
      body: beneficiario
    })
    return result
  }

  async updateBeneficiario(id: number, beneficiario: any) {

    if (beneficiario.id) {
      delete (beneficiario.id)
    }
    const result = await this.fetch<IBeneficiario>(`/beneficiario/${id}`, {
      method: 'PUT',
      body: beneficiario
    })
    return result
  }

  async deleteBeneficiario(id: number) {
    if (id) {
      const result = await this.fetch(`/beneficiario/${id}`, {
        method: 'DELETE',
      })
      return result
    }
  }
}