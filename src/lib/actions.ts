import type {FormState} from "@/types";

export async function shortenAction(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const url = formData.get('url') as string

  if (!url) return { result: null, error: 'URL is required' }

  try {
    // const response = await fetch(`${import.meta.env.VITE_API_URL}/api/shorten`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ url }),
    // })

    // const data = await response.json()
    //
    // if (!response.ok) {
    //   return { result: null, error: data.error?.message || 'Something went wrong' }
    // }

    return { result: {
        code: 'cdrds',
        shortUrl: 'sds',
        statsUrl: 'ssdsd',
        createdAt: new Date().toDateString()
      }, error: null }
  } catch {
    return { result: null, error: 'Network error. Please try again.' }
  }
}
