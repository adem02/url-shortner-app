import {useState} from 'react'
import {ShortenTab} from './ShortenTab'
import {StatsTab} from './StatsTab'
import type {ShortenResultData, FormTabType} from '@/types'

interface Props {
  onResult: (result: ShortenResultData) => void
}

export function FormTabs({ onResult }: Props) {
  const [activeTab, setActiveTab] = useState<FormTabType>('shorten')

  return (
    <div className="max-w-3xl w-full mx-auto bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-[#c2c6d6] overflow-hidden">
      <div className="grid grid-cols-2 border-b border-[#c2c6d6]">
        <button
          onClick={() => setActiveTab('shorten')}
          className={`py-4 text-sm font-medium transition-colors cursor-pointer ${
            activeTab === 'shorten'
              ? 'text-[#0058be] border-b-2 border-[#0058be] bg-[#f0f3ff]'
              : 'text-[#424754] hover:bg-[#f0f3ff]'
          }`}
        >
          Shorten URL
        </button>
        <button
          onClick={() => setActiveTab('stats')}
          className={`py-4 text-sm font-medium transition-colors cursor-pointer ${
            activeTab === 'stats'
              ? 'text-[#0058be] border-b-2 border-[#0058be] bg-[#f0f3ff]'
              : 'text-[#424754] hover:bg-[#f0f3ff]'
          }`}
        >
          View Stats
        </button>
      </div>
      <div className="p-6">
        {activeTab === 'shorten' ? (
          <ShortenTab onResult={onResult} />
        ) : (
          <StatsTab />
        )}
      </div>
    </div>
  )
}
