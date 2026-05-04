import {useNavigate, useParams} from 'react-router'
import {useEffect, useState} from 'react'
import {StatsSubHeader} from '@/components/stats/StatsSubHeader'
import {MetricCards} from '@/components/stats/MetricCards'
import {TrafficOverview} from '@/components/stats/TrafficOverview'
import {TopCountries} from '@/components/stats/TopCountries'
import {DevicesBreakdown} from '@/components/stats/DevicesBreakdown'
import {RecentActivity} from '@/components/stats/RecentActivity'
import {DataManagement} from '@/components/stats/DataManagement'
import type {StatsApiData, StatsApiResponse} from '@/types'
import {useToaster} from '@/hooks/useToaster'
import {ApiClientError, apiRequest} from '@/services/api.service'

export default function Stats() {
  const {code} = useParams<{ code: string }>()
  const navigate = useNavigate()
  const {errorToast} = useToaster()
  const [data, setData] = useState<StatsApiData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      if (!code) {
        setError('Code is required.')
        setLoading(false)
        return
      }

      try {
        const payload = await apiRequest<StatsApiResponse>(
          `/api/stats/${encodeURIComponent(code)}`,
        )

        if (!payload?.data?.link || !payload?.data?.stats) {
          throw new Error('Invalid stats response format')
        }

        setData(payload.data)
      } catch (err) {
        if (err instanceof ApiClientError && err.status === 404) {
          navigate('/404', {replace: true})
          return
        }

        if (err instanceof ApiClientError) {
          setError(err.mapped.message)
          errorToast(err.mapped.message)
        } else {
          const fallbackMessage = 'Failed to load stats.'
          setError(fallbackMessage)
          errorToast(fallbackMessage)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [code, errorToast, navigate])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-[#424754]">Loading stats...</p>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-[#ba1a1a]">{error ?? 'Something went wrong.'}</p>
      </div>
    )
  }

  return (
    <>
      <StatsSubHeader
        code={data.link.code}
        shortUrl={data.link.shortUrl}
        longUrl={data.link.longUrl}
      />

      <div className="px-16 py-6">
        <MetricCards stats={data.stats}/>
        <TrafficOverview clicksPerHour={data.stats.clicksPerHour}/>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          <TopCountries topCountries={data.stats.topCountries}/>
          <DevicesBreakdown devices={data.stats.devices}/>
        </div>

        <RecentActivity recentClicks={data.stats.recentClicks}/>
        <DataManagement
          statsLink={data.link}
          stats={data.stats}
        />
      </div>
    </>
  )
}
