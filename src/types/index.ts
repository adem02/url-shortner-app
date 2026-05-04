export interface ApiSuccessResponse<TData> {
  success: true
  data: TData
}

export interface FormState<TResult = ShortenResultData> {
  result: TResult | null
  error: string | null
  toastError?: string | null
}

export interface ShortenResultData {
  code: string
  shortUrl: string
  statsUrl: string
  createdAt: string
}

export type FormTabType = 'shorten' | 'stats'

export interface ClicksPerHour {
  hour: string
  clicks: number
}

export interface StatsCountry {
  country: string
  clicks: number
  percentage: number
}

export interface StatsDevices {
  mobile: number
  desktop: number
  tablet: number
}

export interface RecentClick {
  timestamp: string
  country: string | null
  device: string
  browser: string | null
}

export interface ClickStats {
  total: number
  today: number
  thisWeek: number
  thisMonth: number
  clicksPerHour: ClicksPerHour[]
  topCountries: StatsCountry[]
  devices: StatsDevices
  recentClicks: RecentClick[]
}

export interface StatsLink {
  code: string
  shortUrl: string
  longUrl: string
  createdAt: string
}

export interface StatsApiData {
  link: StatsLink
  stats: ClickStats
}

export type ShortenApiResponse = ApiSuccessResponse<ShortenResultData>
export type StatsApiResponse = ApiSuccessResponse<StatsApiData>
