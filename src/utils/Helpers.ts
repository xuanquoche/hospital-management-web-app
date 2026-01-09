export function getLocalizedRoute(
  route: string,
  locale: string = 'en'
): string {
  return `/${locale}${route}`;
}

function getApiBaseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_BACKEND_BASE_URL || 'http://localhost:8080/api/v1'
  );
}

export function getDocumentViewUrl(documentId: string): string {
  return `${getApiBaseUrl()}/upload/document/${documentId}/file`;
}

export function getDocumentDownloadUrl(documentId: string): string {
  return `${getApiBaseUrl()}/upload/document/${documentId}/file?download=true`;
}

export function viewDocument(documentId: string): void {
  const url = getDocumentViewUrl(documentId);
  console.log('Opening document URL:', url);
  window.open(url, '_blank');
}

export function downloadDocument(documentId: string): void {
  const url = getDocumentDownloadUrl(documentId);
  console.log('Downloading document URL:', url);
  window.open(url, '_blank');
}

export function getFileExtension(url: string): string {
  const match = url.match(/\.([a-zA-Z0-9]+)(?:\?|$)/);
  return match ? match[1] : '';
}
