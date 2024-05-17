import { isAuthenticated } from "~/helpers/auth.helper"

export default defineNuxtRouteMiddleware((to, from) => {

  const nuxtApp = useNuxtApp()
  console.log(nuxtApp);

  const token = import.meta.client ? localStorage.getItem('auth') : null;

  if (!token && to.path !== '/login') {
    return navigateTo('/login');
  }
})