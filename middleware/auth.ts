import { isAuthenticated } from "~/helpers/auth.helper"

export default defineNuxtRouteMiddleware((to, from) => {

  const nuxtApp = useNuxtApp()

  const token = import.meta.client ? localStorage.getItem('auth') : null;

  if (!import.meta.server && !token && to.path !== '/login') {
    return navigateTo('/login');
  }
})