import type {ShortenResultData} from '@/types'
import {Check, Copy} from 'lucide-react'
import {useState} from 'react'

interface Props {
  result: ShortenResultData
}

export function ShortenResult({result}: Props) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(result.shortUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="max-w-3xl w-full mx-auto mt-6 animate-in fade-in slide-in-from-top-4">
      <div
        className="bg-[#e2e8f8] rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 border border-[#0058be]/20">
        <div className="flex items-center gap-4">
          <div className="text-left">
            <p className="text-xs font-semibold text-[#0058be] uppercase tracking-wider mb-1">
              Your short link is ready
            </p>
            <span className="text-2xl font-semibold text-[#151c27] font-mono">
              {result.shortUrl}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 h-11 px-4 bg-white border border-[#c2c6d6] rounded-lg text-sm font-medium hover:bg-[#f0f3ff] transition-colors shadow-sm cursor-pointer"
          >
            {copied ? <Check size={16} className="text-[#006c49]"/> : <Copy size={16}/>}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  )
}
