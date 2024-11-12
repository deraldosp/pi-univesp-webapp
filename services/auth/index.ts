import type { $Fetch } from 'ofetch';
import type { IAuth, ICredentials } from './types';

export default class AuthService {
  private fetch: $Fetch;

  constructor(fetch: any) {
    this.fetch = fetch
  }

  async login(credentials: ICredentials) {
    const result = await this.fetch<IAuth>('/login', {
      method: 'POST',
      body: credentials
    })
    return result
  }

  async logout() {
    const result = await this.fetch('/logout', {
      method: 'POST',
    })
    return result
  }

}