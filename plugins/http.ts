import BeneficiarioService from "~/services/beneficiarios";
import AuthService from '../services/auth/index';
import DistribuicaoService from "~/services/distribuicao";
import DoadoresService from "~/services/doadores";
import CommonsService from "~/services/commons";


interface IHttp {
  beneficiarios: BeneficiarioService,
  auth: AuthService,
  distribuicao: DistribuicaoService,
  doadores: DoadoresService,
  commons: CommonsService,
  // adicionar novos serviços aqui
}

export default defineNuxtPlugin(({ $config }) => {
  console.log('@@@', $config.public.apiBase)
  const fetcher = $fetch.create({
    baseURL: 'https://caritas-api-htdggqfnaaegaefx.brazilsouth-01.azurewebsites.net/api',
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
    doadores: new DoadoresService(fetcher),
    commons: new CommonsService(fetcher),
    // instanciar novos serviços aqui
  }


  return {
    provide: {
      services: httpServices
    },
  };
});