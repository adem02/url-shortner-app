import {ChevronRight, Check, Copy} from 'lucide-react'
import {Link} from 'react-router'
import {useScrollDirection} from "@/hooks/useScrollDirection.tsx";
import {useState} from 'react'

interface Props {
  code: string
  shortUrl: string
  longUrl: string
}

export function StatsSubHeader({code, shortUrl, longUrl}: Props) {
  const {scrollDir, isAtTop} = useScrollDirection()
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className={`sticky z-40 bg-white/70 backdrop-blur-md shadow-sm border-b border-[#e2e8f8] py-4 transition-all duration-300 ${
        scrollDir === 'down' && !isAtTop ? 'top-0' : 'top-14'
      }`}>
      <div className="mx-auto px-16 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <nav className="flex items-center gap-2 text-[#424754] text-xs mb-1">
            <Link to="/" className="hover:text-[#0058be] transition-colors">Home</Link>
            <ChevronRight size={14}/>
            <span className="hover:text-[#0058be] cursor-pointer transition-colors">Stats</span>
            <ChevronRight size={14}/>
            <span className="text-[#0058be] font-semibold">{code}</span>
          </nav>

          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-[#151c27]">{shortUrl}</h1>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-3 py-1.5 bg-[#2170e4] text-white rounded-lg text-sm font-medium hover:opacity-90 active:scale-95 transition-all cursor-pointer"
            >
              {copied ? <Check size={16}/> : <Copy size={16}/>}
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-xs text-[#424754]">Target URL</span>
            <span className="text-sm text-[#0058be] truncate max-w-60">{longUrl}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
