import type {FormState, ShortenApiResponse} from "@/types";
import { ApiClientError, apiRequest } from '@/services/api.service'

export async function shortenAction(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const url = formData.get('url') as string

  if (!url) return { result: null, error: 'URL is required', toastError: null }

  try {
    const data = await apiRequest<ShortenApiResponse>('/api/shorten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    })

    return { result: data.data, error: null, toastError: null }
  } catch (error) {
    if (error instanceof ApiClientError) {
      if (error.mapped.channel === 'inline') {
        return { result: null, error: error.mapped.message, toastError: null }
      }

      return { result: null, error: null, toastError: error.mapped.message }
    }

    return { result: null, error: null, toastError: 'Network error. Please try again.' }
  }
}
