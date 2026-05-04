import {ApiErrorCode, type ApiErrorResponse, type MappedAppError} from '@/types/error.types';

const defaultErrorMessage = 'Something went wrong. Please try again.';

const keyMessageMap: Record<string, string> = {
  'validation/failed': 'Invalid URL.',
  'resource/not-found': 'Resource not found.',
  'security/rate-limit-exceeded': 'Too many requests. Please try again later.',
  'link/code-generation-failed': 'Service unavailable. Please try again later.',
  'sql/failed': 'Something went wrong. Please try again.',
  'cache/failed': 'Something went wrong. Please try again.',
  'internal/unknown': 'Something went wrong. Please try again.',
};

const genericByCode: Record<number, string> = {
  [ApiErrorCode.InternalServerError]: 'Something went wrong. Please try again.',
  [ApiErrorCode.ServiceUnavailable]: 'Service unavailable. Please try again later.',
  [ApiErrorCode.TooManyRequests]: 'Too many requests. Please try again later.',
  [ApiErrorCode.NotFound]: 'Resource not found.',
};

function isApiErrorResponse(value: unknown): value is ApiErrorResponse {
  if (!value || typeof value !== 'object') return false;

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.code === 'number' &&
    (candidate.key === undefined || typeof candidate.key === 'string') &&
    (candidate.message === undefined || typeof candidate.message === 'string')
  );
}

function getApiErrorPayload(input: unknown): ApiErrorResponse | null {
  if (!input || typeof input !== 'object') return null;

  const root = input as Record<string, unknown>;

  if (isApiErrorResponse(root.error)) {
    return root.error;
  }

  if (isApiErrorResponse(root)) {
    return root;
  }

  return null;
}

export function mapApiError(input: unknown): MappedAppError {
  const payload = getApiErrorPayload(input);

  if (!payload) {
    return {
      message: defaultErrorMessage,
      channel: 'toast',
    };
  }

  const code = payload.code;
  const key = typeof payload.key === 'string' ? payload.key : undefined;
  const message = typeof payload.message === 'string' ? payload.message : undefined;

  if (code === ApiErrorCode.BadRequest && key === 'validation/failed') {
    return {
      message: message || keyMessageMap['validation/failed'],
      channel: 'inline',
      code,
      key,
    };
  }

  const resolvedMessage =
    (key ? keyMessageMap[key] : undefined) ||
    genericByCode[code] ||
    message ||
    defaultErrorMessage;

  return {
    message: resolvedMessage,
    channel: 'toast',
    code,
    key,
  };
}
