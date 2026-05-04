import type {StatsCountry} from '@/types'
import {COUNTRY_FLAGS, COUNTRY_NAMES} from "@/utils/constants.ts";
import {Globe} from 'lucide-react'

interface Props {
  topCountries: StatsCountry[]
}

export function TopCountries({topCountries}: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#c2c6d6]/30 p-6">
      <div className="flex items-center gap-2 mb-6">
        <Globe size={20} className="text-[#0058be]"/>
        <h3 className="text-xl font-semibold text-[#151c27]">Top Countries</h3>
      </div>

      {topCountries.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-[#424754]">
          <Globe size={40} className="mb-3 text-[#c2c6d6]"/>
          <p className="text-sm">No country data yet</p>
        </div>
      ) : (
        <div className="space-y-6">
          {topCountries.map(({country, clicks, percentage}) => (
            <div key={country} className="space-y-2">
              <div className="flex justify-between items-center text-sm">
              <span className="flex items-center gap-3">
                <span className="text-xl">
                  {country ? (COUNTRY_FLAGS[country] ?? <Globe size={18} className="text-[#424754]"/>) :
                    <Globe size={18} className="text-[#424754]"/>}
                </span>
                {country ? (COUNTRY_NAMES[country] ?? country) : 'Unknown'}
              </span>
                <span className="text-[#151c27] font-semibold">
                {clicks.toLocaleString()} ({percentage}%)
              </span>
              </div>
              <div className="h-2 w-full bg-[#e7eefe] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#0058be] rounded-full"
                  style={{width: `${percentage}%`}}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
