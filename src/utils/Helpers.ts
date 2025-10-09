export function getLocalizedRoute(
  route: string,
  locale: string = 'en'
): string {
  return `/${locale}${route}`;
}
