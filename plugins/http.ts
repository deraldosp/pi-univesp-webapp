import BeneficiarioService from "~/services/beneficiarios";
import AuthService from '../services/auth/index';


interface IHttp {
  beneficiarios: BeneficiarioService,
  auth: AuthService,
  // adicionar novos serviços aqui
}

export default defineNuxtPlugin(({ $config }) => {

  const fetcher = $fetch.create({
    baseURL: $config.public.apiBase,
    onRequest({ request, options }) {
      const authHeader = { Authorization: `Bearer ${localStorage.getItem('token') ?? 'xyz'}` };
      const headers = {
        ...authHeader,
        Accept: 'application/json'
      }
      options.headers = Object.assign(headers, options.headers);
    },
  });


  const httpServices: IHttp = {
    beneficiarios: new BeneficiarioService(fetcher),
    auth: new AuthService(fetcher),
    // adicionar novos serviços aqui
  }


  return {
    provide: {
      services: httpServices
    },
  };
});