import type {ClickStats} from '@/types'

interface Props {
  stats: ClickStats
}

interface MetricCardProps {
  label: string
  value: number
  badge: string
  badgePositive: boolean
  subText: string
  showProgress?: boolean
  total?: number
}

function MetricCard({label, value, badge, badgePositive, subText, showProgress, total}: MetricCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-[#c2c6d6]/30">
      <div className="flex justify-between items-start mb-4">
        <span className="text-sm text-[#424754]">{label}</span>
        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
          badgePositive
            ? 'bg-[#006c49]/10 text-[#006c49]'
            : 'bg-[#ba1a1a]/10 text-[#ba1a1a]'
        }`}>
          {badge}
        </span>
      </div>
      <div className="text-3xl font-semibold text-[#151c27]">
        {value.toLocaleString()}
      </div>
      {showProgress && total && (
        <div className="mt-4 h-1 w-full bg-[#e7eefe] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#0058be] rounded-full"
            style={{width: `${Math.min((value / total) * 100, 100)}%`}}
          />
        </div>
      )}
      {!showProgress && (
        <div className="mt-4 flex items-center gap-1 text-xs text-[#424754]">
          {subText}
        </div>
      )}
    </div>
  )
}

export function MetricCards({stats}: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      <MetricCard
        label="Total Clicks"
        value={stats.total}
        badge="+12%"
        badgePositive={true}
        subText=""
        showProgress={true}
        total={stats.total}
      />
      <MetricCard
        label="Today"
        value={stats.today}
        badge="+5.2%"
        badgePositive={true}
        subText="Higher than yesterday"
      />
      <MetricCard
        label="This Week"
        value={stats.thisWeek}
        badge="+8.1%"
        badgePositive={true}
        subText={`Previous: ${(stats.thisWeek * 0.9).toLocaleString()}`}
      />
      <MetricCard
        label="This Month"
        value={stats.thisMonth}
        badge="-2.4%"
        badgePositive={false}
        subText="Forecast: 34k"
      />
    </div>
  )
}
