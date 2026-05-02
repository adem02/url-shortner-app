export interface ShortenResult {
  code: string
  shortUrl: string
  statsUrl: string
  createdAt: string
}

export interface FormState {
  result: ShortenResult | null
  error: string | null
}

export interface ShortenResultData {
  code: string
  shortUrl: string
  statsUrl: string
  createdAt: string
}

export type FormTabType = 'shorten' | 'stats'
