import {Download} from 'lucide-react'
import type {ClickStats, StatsLink} from '@/types'
import {exportToCSV} from "@/services/data-management.service.ts";

interface Props {
  statsLink: StatsLink
  stats: ClickStats
}

export function DataManagement({statsLink, stats}: Props) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center bg-[#f0f3ff] rounded-xl p-6 gap-4">
      <div className="text-center md:text-left">
        <h4 className="text-lg font-semibold text-[#151c27]">Data Management</h4>
        <p className="text-sm text-[#424754]">Export your shortened link metrics</p>
      </div>
      <div className="flex gap-4">
        <button
          onClick={() => exportToCSV(statsLink, stats)}
          className="flex items-center gap-2 px-6 py-2.5 bg-white border border-[#c2c6d6] text-[#151c27] text-sm font-medium rounded-lg hover:bg-white active:scale-95 transition-all cursor-pointer"
        >
          <Download size={18}/>
          Export CSV
        </button>
      </div>
    </div>
  )
}
