import {PieChart, Pie, ResponsiveContainer, Tooltip, Sector} from 'recharts'
import type {StatsDevices} from '@/types'
import type {PieSectorDataItem} from 'recharts/types/polar/Pie'
import {Smartphone, Laptop, Tablet} from 'lucide-react'

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

  const isEmpty = total === 0

  const data = isEmpty
    ? []
    : [
      {
        name: 'Mobile',
        value: Math.round((devices.mobile / total) * 100),
        color: '#0058be',
        icon: <Smartphone size={14}/>
      },
      {
        name: 'Desktop',
        value: Math.round((devices.desktop / total) * 100),
        color: '#006c49',
        icon: <Laptop size={14}/>
      },
      {name: 'Tablet', value: Math.round((devices.tablet / total) * 100), color: '#c2c6d6', icon: <Tablet size={14}/>},
    ]

  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#c2c6d6]/30 p-6">
      <div className="flex items-center gap-2 mb-6">
        <Smartphone size={20} className="text-[#0058be]"/>
        <h3 className="text-xl font-semibold text-[#151c27]">Devices Breakdown</h3>
      </div>

      {isEmpty ? (
        <div className="flex flex-col items-center justify-center py-8 text-[#424754]">
          <Smartphone size={40} className="mb-3 text-[#c2c6d6]"/>
          <p className="text-sm">No device data yet</p>
        </div>
      ) : (
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
            {data.map(({name, value, color, icon}) => (
              <div key={name} className="flex flex-col items-center">
                <div className="flex items-center gap-2 mb-1" style={{color}}>
                  {icon}
                  <span className="text-xs font-medium text-[#151c27]">{name}</span>
                </div>
                <span className="text-lg font-bold text-[#151c27]">{value}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
