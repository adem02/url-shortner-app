import type {ReactNode} from "react";
import type {RecentClick} from '@/types'
import {Laptop, Smartphone, Tablet} from "lucide-react";
import {COUNTRY_FLAGS, COUNTRY_NAMES} from "@/utils/constants.ts";

interface Props {
  recentClicks: RecentClick[]
}

function formatTimestamp(timestamp: string): string {
  const diff = Date.now() - new Date(timestamp).getTime()
  const minutes = Math.floor(diff / 60000)

  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes} min${minutes > 1 ? 's' : ''} ago`

  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`

  const days = Math.floor(hours / 24)
  return `${days} day${days > 1 ? 's' : ''} ago`
}

function getDeviceIcon(device: string): ReactNode {
  if (device === 'mobile') return <Smartphone size={16} className="inline"/>
  if (device === 'tablet') return <Tablet size={16} className="inline"/>
  return <Laptop size={16} className="inline"/>
}

export function RecentActivity({recentClicks}: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#c2c6d6]/30 overflow-hidden mb-12">
      <div className="p-6 border-b border-[#c2c6d6]/30 flex justify-between items-center">
        <h3 className="text-xl font-semibold text-[#151c27]">Recent Activity</h3>
        <button className="text-[#0058be] text-sm font-medium hover:underline">
          View All Logs
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
          <tr className="bg-[#f0f3ff] text-[#424754] text-xs font-semibold uppercase tracking-wider">
            <th className="px-6 py-4">Timestamp</th>
            <th className="px-6 py-4">Location</th>
            <th className="px-6 py-4">Device</th>
            <th className="px-6 py-4">Browser</th>
            <th className="px-6 py-4">Status</th>
          </tr>
          </thead>
          <tbody className="divide-y divide-[#c2c6d6]/30">
          {recentClicks.map((click, index) => (
            <tr
              key={index}
              className="hover:bg-[#f0f3ff]/50 transition-colors"
            >
              <td className="px-6 py-4 text-sm font-medium text-[#151c27]">
                {formatTimestamp(click.timestamp)}
              </td>
              <td className="px-6 py-4 text-sm text-[#151c27]">
                  <span className="mr-2">
                    {click.country ? (COUNTRY_FLAGS[click.country] ?? '🌐') : '🌐'}
                  </span>
                {click.country ? (COUNTRY_NAMES[click.country] ?? click.country) : 'Unknown'}
              </td>
              <td className="px-6 py-4 text-sm text-[#151c27]">
                <span className="inline-flex items-center gap-2">
                  {getDeviceIcon(click.device)}
                  {click.device.charAt(0).toUpperCase() + click.device.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-[#151c27]">
                {click.browser ?? 'Unknown'}
              </td>
              <td className="px-6 py-4">
                  <span className="bg-[#006c49]/10 text-[#006c49] px-2 py-1 rounded text-xs font-bold">
                    SUCCESS
                  </span>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
