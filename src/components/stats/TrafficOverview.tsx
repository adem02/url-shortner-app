import {BarChart, Bar, XAxis, Tooltip, ResponsiveContainer} from 'recharts'
import type {ClicksPerHour} from '@/types'
import type {BarShapeProps} from 'recharts/types/cartesian/Bar'

interface Props {
  clicksPerHour: ClicksPerHour[]
}

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{ value: number }>
  label?: string
}

function buildFullDayData(clicksPerHour: ClicksPerHour[]): ClicksPerHour[] {
  const map = new Map(clicksPerHour.map((c) => [c.hour, c.clicks]))

  return Array.from({length: 24}, (_, i) => {
    const hour = `${String(i).padStart(2, '0')}:00`
    return {hour, clicks: map.get(hour) ?? 0}
  })
}

const CustomTooltip = ({active, payload, label}: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#2a313d] text-white px-2 py-1 rounded text-xs">
        {label} — {payload[0].value}
      </div>
    )
  }
  return null
}

export function TrafficOverview({clicksPerHour}: Props) {
  const data = buildFullDayData(clicksPerHour)
  const maxClicks = Math.max(...data.map((d) => d.clicks), 1)

  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#c2c6d6]/30 p-6 mb-12">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h3 className="text-2xl font-semibold text-[#151c27]">Traffic Overview</h3>
          <p className="text-sm text-[#424754]">Clicks per hour for the last 24 hours</p>
        </div>
        <span className="px-4 py-2 bg-[#e7eefe] text-[#151c27] text-sm font-medium rounded-lg">
          24h
        </span>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} barCategoryGap="20%">
          <XAxis
            dataKey="hour"
            tickLine={false}
            axisLine={false}
            tick={{fontSize: 12, fill: '#424754'}}
            ticks={['00:00', '06:00', '12:00', '18:00', '23:00']}
          />
          <Tooltip content={<CustomTooltip/>} cursor={false}/>
          <Bar
            dataKey="clicks"
            radius={[2, 2, 0, 0]}
            shape={(props: BarShapeProps) => {
              const {x, y, width, height, value} = props
              const numValue = Array.isArray(value) ? Number(value[1]) : Number(value ?? 0)
              const opacity = numValue === maxClicks ? 1 : Math.max(0.15, numValue / maxClicks)
              return (
                <rect
                  x={x}
                  y={y}
                  width={width}
                  height={height}
                  fill={`rgba(0, 88, 190, ${opacity})`}
                  rx={2}
                  ry={2}
                />
              )
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
