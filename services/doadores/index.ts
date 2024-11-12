import type { $Fetch } from 'ofetch';
import type { IServiceLaravelPaginate } from '../types';
import type { IDoador, IPaginate } from './types';


export default class DoadoresService {
  private fetch: $Fetch;

  constructor(fetch: any) {
    this.fetch = fetch
  }

  async getDoadores(paginate: IPaginate = { perPage: 10, page: 1 }, search?: string) {

    const withSearch = search ? { search: `nome|${search}` } : {};

    const result = await this.fetch<IServiceLaravelPaginate>('/doadores', {
      method: 'GET',
      query: {
        perpage: paginate.perPage,
        page: paginate.page,
        ...withSearch
      }
    })
    return result
  }

  async getDoador(id: number) {
    const result = await this.fetch<IDoador>(`/doadores/${id}`, {
      method: 'GET',
    })
    return result
  }

  async createDoador(doador: any) {
    const result = await this.fetch<IDoador>(`/doadores`, {
      method: 'POST',
      body: doador
    })
    return result
  }

  async updateDoador(id: number, doador: any) {

    if (doador.id) {
      delete (doador.id)
    }
    const result = await this.fetch<IDoador>(`/doadores/${id}`, {
      method: 'PUT',
      body: doador
    })
    return result
  }

  async deleteDoador(id: number) {
    if (id) {
      const result = await this.fetch(`/doadores/${id}`, {
        method: 'DELETE',
      })
      return result
    }
  }
}