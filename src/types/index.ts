export interface ShortenResultData {
  code: string
  shortUrl: string
  statsUrl: string
  createdAt: string
}

export interface FormState {
  result: ShortenResultData | null
  error: string | null
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

export interface StatsResponse {
  statsLink: StatsLink
  stats: ClickStats
}
