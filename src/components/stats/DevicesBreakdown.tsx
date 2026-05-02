import {PieChart, Pie, ResponsiveContainer, Tooltip, Sector} from 'recharts'
import type {StatsDevices} from '@/types'
import type {PieSectorDataItem} from 'recharts/types/polar/Pie'

interface Props {
  devices: StatsDevices
}

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{ name: string; value: number }>
}

const CustomTooltip = ({active, payload}: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#2a313d] text-white px-2 py-1 rounded text-xs">
        {payload[0].name} — {payload[0].value}%
      </div>
    )
  }
  return null
}

export function DevicesBreakdown({devices}: Props) {
  const total = devices.mobile + devices.desktop + devices.tablet

  const data = [
    {name: 'Mobile', value: Math.round((devices.mobile / total) * 100), color: '#0058be'},
    {name: 'Desktop', value: Math.round((devices.desktop / total) * 100), color: '#006c49'},
    {name: 'Other', value: Math.round((devices.tablet / total) * 100), color: '#e7eefe'},
  ]

  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#c2c6d6]/30 p-6">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-[#0058be]">📱</span>
        <h3 className="text-xl font-semibold text-[#151c27]">Devices Breakdown</h3>
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className="relative w-48 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={75}
                dataKey="value"
                strokeWidth={0}
                fill="#0058be"
                shape={(props: PieSectorDataItem & { index: number }) => {
                  const {cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill} = props
                  return (
                    <Sector
                      cx={cx}
                      cy={cy}
                      innerRadius={innerRadius}
                      outerRadius={outerRadius}
                      startAngle={startAngle}
                      endAngle={endAngle}
                      fill={data[props.index]?.color ?? fill}
                    />
                  )
                }}
              />
              <Tooltip content={<CustomTooltip/>}/>
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-semibold text-[#151c27]">
              {total.toLocaleString()}
            </span>
            <span className="text-xs text-[#424754] uppercase tracking-wider">Sessions</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8 w-full px-4 mt-8">
          {data.map(({name, value, color}) => (
            <div key={name} className="flex flex-col items-center">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 rounded-full" style={{backgroundColor: color}}/>
                <span className="text-xs font-medium text-[#151c27]">{name}</span>
              </div>
              <span className="text-lg font-bold text-[#151c27]">{value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
