export function isAuthenticated(): boolean | void {

  if (import.meta.client && !localStorage.getItem('token')) {
    return false
  }
  return true
}