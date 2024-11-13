import { isAuthenticated } from "~/helpers/auth.helper"

interface Entidade {
  id: number;
  nome: string;
  descricao: string|null;
  cnpj: string|null;
  email: string|null;
  telefone: string|null;
  endereco: string|null;
  cep: string|null;
  tipo_atividade: string|null;
  created_at: string|null;
  updated_at: string|null;
}
interface authUser {
  email: string;
  entidade: Entidade;
  entidade_id: number;
  id: number;
  name: string;
}
interface AuthStorage {
  access_token: string;
  expires_in: number;
  token_type: string;
  user: authUser;
}

export default defineNuxtRouteMiddleware((to, from) => {

  const nuxtApp = useNuxtApp()

  const auth: AuthStorage = import.meta.client ? JSON.parse(localStorage.getItem('auth') || 'null') : null;

  if (!import.meta.server && !auth && to.path !== '/login') {
    return navigateTo('/login');
  }

  if (auth?.expires_in && auth.expires_in < new Date().getTime()) {
    console.log(auth.expires_in, new Date().getTime());
    localStorage.removeItem('auth');
    localStorage.removeItem('token');
    return navigateTo('/login');
  }
})