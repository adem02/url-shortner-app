import type { ShortenResultData } from '@/types'
import { Copy, Share2 } from 'lucide-react'

interface Props {
  result: ShortenResultData
}

export function ShortenResult({ result }: Props) {
  const handleCopy = () => {
    navigator.clipboard.writeText(result.shortUrl)
  }

  const handleShare = () => {
    navigator.share?.({ url: result.shortUrl })
  }

  return (
    <div className="max-w-3xl w-full mx-auto mt-6 animate-in fade-in slide-in-from-top-4">
      <div className="bg-[#e2e8f8] rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 border border-[#0058be]/20">
        <div className="flex items-center gap-4">
          <div className="bg-white p-2 rounded-lg shadow-sm">
            <div className="w-16 h-16 bg-slate-100 flex items-center justify-center border border-slate-200 text-xs text-slate-400">
              QR
            </div>
          </div>
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
            className="flex items-center gap-2 h-11 px-4 bg-white border border-[#c2c6d6] rounded-lg text-sm font-medium hover:bg-[#f0f3ff] transition-colors shadow-sm"
          >
            <Copy size={16} />
            Copy
          </button>
          <button
            onClick={handleShare}
            className="flex items-center justify-center h-11 w-11 bg-white border border-[#c2c6d6] rounded-lg hover:bg-[#f0f3ff] transition-colors shadow-sm"
          >
            <Share2 size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
