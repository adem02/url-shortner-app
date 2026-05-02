import {useParams} from 'react-router'
import {useEffect, useState} from 'react'
import {StatsSubHeader} from '@/components/stats/StatsSubHeader'
import {MetricCards} from '@/components/stats/MetricCards'
import {TrafficOverview} from '@/components/stats/TrafficOverview'
import {TopCountries} from '@/components/stats/TopCountries'
import {DevicesBreakdown} from '@/components/stats/DevicesBreakdown'
import {RecentActivity} from '@/components/stats/RecentActivity'
import {DataManagement} from '@/components/stats/DataManagement'
import type {StatsResponse} from '@/types'
import {MOCK_DATA} from "@/data";

export default function Stats() {
  const {code} = useParams<{ code: string }>()
  const [data, setData] = useState<StatsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      if (!code) return

      try {
        // TODO: API call

        // Mock data
        await new Promise((resolve) => setTimeout(resolve, 500))
        setData(MOCK_DATA)
      } catch {
        setError('Failed to load stats.')
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [code])

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
        code={data.statsLink.code}
        shortUrl={data.statsLink.shortUrl}
        longUrl={data.statsLink.longUrl}
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
          statsLink={data.statsLink}
          stats={data.stats}
        />
      </div>
    </>
  )
}
