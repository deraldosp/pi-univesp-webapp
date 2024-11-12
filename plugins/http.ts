import BeneficiarioService from "~/services/beneficiarios";
import AuthService from '../services/auth/index';
import DistribuicaoService from "~/services/distribuicao";
import DoadoresService from "~/services/doadores";


interface IHttp {
  beneficiarios: BeneficiarioService,
  auth: AuthService,
  distribuicao: DistribuicaoService,
  doadores: DoadoresService,
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
    distribuicao: new DistribuicaoService(fetcher),
    doadores: new DoadoresService(fetcher)
    // instanciar novos serviços aqui
  }


  return {
    provide: {
      services: httpServices
    },
  };
});