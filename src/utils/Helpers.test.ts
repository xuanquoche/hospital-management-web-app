import {
  downloadDocument,
  getDocumentDownloadUrl,
  getDocumentViewUrl,
  getFileExtension,
  getLocalizedRoute,
  viewDocument,
} from './Helpers';

describe('Helpers', () => {
  const originalBaseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
  const openMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.NEXT_PUBLIC_BACKEND_BASE_URL = 'https://backend.test/api/v1';
    jest.spyOn(console, 'log').mockImplementation(() => undefined);

    Object.defineProperty(window, 'open', {
      configurable: true,
      value: openMock,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  afterAll(() => {
    process.env.NEXT_PUBLIC_BACKEND_BASE_URL = originalBaseUrl;
  });

  it('prefixes routes with the selected locale', () => {
    expect(getLocalizedRoute('/patient/dashboard', 'vi')).toBe(
      '/vi/patient/dashboard'
    );
    expect(getLocalizedRoute('/sign-in')).toBe('/en/sign-in');
  });

  it('builds document view and download URLs', () => {
    expect(getDocumentViewUrl('doc-1')).toBe(
      'https://backend.test/api/v1/upload/document/doc-1/file'
    );
    expect(getDocumentDownloadUrl('doc-1')).toBe(
      'https://backend.test/api/v1/upload/document/doc-1/file?download=true'
    );
  });

  it('opens document URLs in a new tab', () => {
    viewDocument('doc-2');
    downloadDocument('doc-3');

    expect(openMock).toHaveBeenNthCalledWith(
      1,
      'https://backend.test/api/v1/upload/document/doc-2/file',
      '_blank'
    );
    expect(openMock).toHaveBeenNthCalledWith(
      2,
      'https://backend.test/api/v1/upload/document/doc-3/file?download=true',
      '_blank'
    );
  });

  it('extracts file extensions before an optional query string', () => {
    expect(getFileExtension('/uploads/report.pdf?token=abc')).toBe('pdf');
    expect(getFileExtension('/uploads/archive.tar.gz')).toBe('gz');
    expect(getFileExtension('/uploads/no-extension')).toBe('');
  });
});
