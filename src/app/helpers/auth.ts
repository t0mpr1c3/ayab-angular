export function isLoggedOut(): boolean {
  return !localStorage.getItem('userData');
}