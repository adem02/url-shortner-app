import {useState} from 'react'
import {Hero} from '@/components/landing/Hero'
import {FormTabs} from '@/components/landing/FormTabs'
import {ShortenResult} from '@/components/landing/ShortenResult'
import type {ShortenResultData} from '@/types'
import {FeatureCards} from "@/components/landing/FeatureCards.tsx";

export default function Home() {
  const [result, setResult] = useState<ShortenResultData | null>(null)

  return (
    <div className="flex flex-col w-full">
      <section
        className="w-full px-6 pt-16 pb-32"
        style={{
          background: 'radial-gradient(circle at 50% -20%, #e0eaff 0%, #f9f9ff 100%)'
        }}
      >
        <Hero/>
        <FormTabs onResult={setResult}/>
        {result && <ShortenResult result={result}/>}
      </section>

      <div className="flex-1 flex items-center py-16">
        <FeatureCards/>
      </div>
    </div>
  )
}
