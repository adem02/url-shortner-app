import {useActionState} from 'react'
import {shortenAction} from '@/lib/actions'
import type {ShortenResultData} from '@/types'
import {useEffect} from 'react'
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useToaster} from '@/hooks/useToaster'

interface Props {
  onResult: (result: ShortenResultData) => void
}

export function ShortenTab({onResult}: Props) {
  const {errorToast} = useToaster()

  const [state, action, isPending] = useActionState(shortenAction, {
    result: null,
    error: null,
    toastError: null,
  })

  useEffect(() => {
    if (state.result) {
      onResult(state.result)
    }
  }, [onResult, state.result])

  useEffect(() => {
    if (state.toastError) {
      errorToast(state.toastError)
    }
  }, [errorToast, state.toastError])

  return (
    <form action={action} className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          name="url"
          type="text"
          placeholder="Paste your long link here..."
          className="flex-1 h-12 px-4 rounded-lg border border-[#727785] focus:ring-2 focus:ring-[#0058be]/20 focus:border-[#0058be] outline-none transition-all bg-[#f9f9ff] text-base"
        />
        <Button
          type="submit"
          disabled={isPending}
          className="h-12 px-12 bg-[#0058be] text-white rounded-lg text-sm font-medium hover:opacity-90 active:scale-[0.98] transition-all shadow-md cursor-pointer"
        >
          {isPending ? 'Shortening...' : 'Shorten Now'}
        </Button>
      </div>
      {state.error && (
        <p className="text-sm text-[#ba1a1a]">{state.error}</p>
      )}
    </form>
  )
}
