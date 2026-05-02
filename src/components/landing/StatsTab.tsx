import {useActionState} from 'react'
import {useNavigate} from 'react-router'
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";

export function StatsTab() {
  const navigate = useNavigate()

  async function statsAction(
    _prev: { error: string | null },
    formData: FormData
  ): Promise<{ error: string | null }> {
    const code = (formData.get('code') as string).trim()
    if (!code) return {error: 'Code is required'}
    navigate(`/stats/${code}`)
    return {error: null}
  }

  const [state, action, isPending] = useActionState(statsAction, {error: null})

  return (
    <form action={action} className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          name="code"
          type="text"
          placeholder="Enter your short code (e.g. a3x9k2)"
          className="flex-1 h-12 px-4 rounded-lg border border-[#727785] focus:ring-2 focus:ring-[#0058be]/20 focus:border-[#0058be] outline-none transition-all bg-[#f9f9ff] text-base"
        />
        <Button
          type="submit"
          disabled={isPending}
          className="h-12 px-12 bg-[#0058be] text-white rounded-lg text-sm font-medium hover:opacity-90 active:scale-[0.98] transition-all shadow-md"
        >
          {isPending ? 'Checking...' : 'Check Analytics'}
        </Button>
      </div>

      {state.error && (
        <p className="text-sm text-[#ba1a1a]">{state.error}</p>
      )}
    </form>
  )
}
