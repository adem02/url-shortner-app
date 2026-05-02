import {useNavigate} from 'react-router'
import {LinkIcon, PlusCircle} from 'lucide-react'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <main className="grow flex items-center justify-center py-12 px-6">
      <div className="max-w-300 w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        <div className="relative order-2 md:order-1 flex justify-center">
          <div
            className="relative w-full max-w-sm aspect-square bg-[#e7eefe] rounded-full flex items-center justify-center overflow-hidden">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjanoJhjFMfM43pe30OQFPHwfuriugdHgsu0DJO2GKysb_p5EoG71Sy2s3po9LAWESubev00OdWnzPJG-TpUzzLhgBQ1wVwHnqysQcR9WLk58ewdzpMjuq0IUyWa6Nrqa1uvZCa0e4wwnRhiEUbSqFnQYSuxdmiXyxAw9FC65kfkW9o7vm3UpLBmzkv_Pj2y-0IzdWg_aQGbBNP5-USZovm7VmnPZTYt3N7M62UyRqjGmjpaOAioiUlTYoziR_m3zGWLkqJmCAXpeY"
              alt="Broken link illustration"
              className="w-3/4 h-3/4 object-contain"
            />
            <div className="absolute inset-0 bg-linear-to-tr from-[#0058be]/5 to-transparent"/>
          </div>

          <div className="absolute top-1 -right-0.5 bg-white p-2 rounded-lg shadow-lg border border-[#c2c6d6]">
            <div className="flex gap-1 mb-2">
              <div className="w-2 h-2 rounded-full bg-[#ba1a1a]"/>
              <div className="w-2 h-2 rounded-full bg-[#924700]"/>
              <div className="w-2 h-2 rounded-full bg-[#006c49]"/>
            </div>
            <code className="text-xs font-mono text-[#424754]">ERROR_CODE: 404</code>
          </div>
        </div>

        <div className="order-1 md:order-2 text-center md:text-left space-y-4">
          <div className="inline-flex items-center px-3 py-1 bg-[#e2e8f8] rounded-full border border-[#c2c6d6]">
            <LinkIcon size={16} className="text-[#0058be] mr-2"/>
            <span className="text-xs font-medium text-[#0058be] uppercase tracking-wider">
              Broken Path
            </span>
          </div>

          <h1 className="text-5xl font-bold leading-tight text-[#151c27]">
            Lost in the <span className="text-[#0058be]">Short</span> Circuit
          </h1>

          <p className="text-lg text-[#424754] max-w-lg">
            This link doesn't exist or has expired. The destination you are looking for has been moved or the creator
            has revoked access.
          </p>

          <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/')}
              className="bg-[#0058be] hover:bg-[#2170e4] text-white px-8 py-4 rounded-xl text-sm font-medium shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
            >
              <PlusCircle size={18}/>
              Create a new short link
            </button>
          </div>

          <div className="pt-12 grid grid-cols-2 gap-4 opacity-60">
            <div className="p-4 bg-[#e7eefe] rounded-lg">
              <span className="text-sm font-medium block text-[#151c27]">Need Help?</span>
              <a href="#" className="text-xs font-mono text-[#0058be] underline">
                Visit Docs
              </a>
            </div>
            <div className="p-4 bg-[#e7eefe] rounded-lg">
              <span className="text-sm font-medium block text-[#151c27]">Status</span>
              <span className="text-xs font-mono text-[#006c49]">All Systems Nominal</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
