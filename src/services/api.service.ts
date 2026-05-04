import {mapApiError} from '@/lib/api-error';
import type {MappedAppError} from '@/types/error.types';

function getApiBaseUrl(): string {
  return (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, '') ?? '';
}

function buildApiUrl(path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${getApiBaseUrl()}${normalizedPath}`;
}

export class ApiClientError extends Error {
  readonly mapped: MappedAppError;
  readonly status?: number;

  constructor(mapped: MappedAppError, status?: number) {
    super(mapped.message);
    this.mapped = mapped;
    this.status = status;
    Object.setPrototypeOf(this, ApiClientError.prototype);
  }
}

export async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  try {
    const response = await fetch(buildApiUrl(path), init);
    const body = await response.json().catch(() => null);

    if (!response.ok) {
      throw new ApiClientError(mapApiError(body), response.status);
    }

    return body as T;
  } catch (error) {
    if (error instanceof ApiClientError) {
      throw error;
    }

    throw new ApiClientError({
      message: 'Network error. Please try again.',
      channel: 'toast',
    });
  }
}
