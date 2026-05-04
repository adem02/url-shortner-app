export const ApiErrorCode = {
  InternalServerError: 500,

  BadRequest: 400,
  NotFound: 404,
  UnprocessableEntity: 422,
  TooManyRequests: 429,

  ServiceUnavailable: 503,
} as const;

export type ApiErrorCode = (typeof ApiErrorCode)[keyof typeof ApiErrorCode];

export type ApiErrorKey =
  | 'sql/failed'
  | 'sql/not-found'
  | 'internal/unknown'
  | 'validation/failed'
  | 'security/rate-limit-exceeded'
  | 'resource/not-found'
  | 'link/code-generation-failed'
  | 'cache/failed';

export interface ApiErrorResponse {
  code: number;
  key?: ApiErrorKey | string;
  message?: string;
  details?: unknown;
}

export interface MappedAppError {
  message: string;
  channel: 'inline' | 'toast';
  code?: number;
  key?: string;
}
