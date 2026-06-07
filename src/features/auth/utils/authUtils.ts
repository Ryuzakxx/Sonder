export function isPublicRoute(pathname: string) {
  return pathname.startsWith("/sign-in");
}
