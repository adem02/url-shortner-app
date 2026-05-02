import {Zap, ChartNoAxesColumn, Shield} from 'lucide-react'

const features = [
  {
    icon: <Zap size={24} fill="currentColor"/>,
    title: 'Fast',
    description: 'Redirects in under 20ms powered by Redis cache. Every link is cached on creation for instant access.',
  },
  {
    icon: <ChartNoAxesColumn size={24} fill="currentColor"/>,
    title: 'Analytics',
    description: 'Track clicks, countries, devices and browsers for every shortened link with detailed reporting.',
  },
  {
    icon: <Shield size={24} fill="currentColor"/>,
    title: 'Secure',
    description: 'Strict URL validation, private domain blacklisting and rate limiting at 20 requests per hour.',
  },
]

export function FeatureCards() {
  return (
    <section className="py-12 px-6 bg-[#f9f9ff] w-full">
      <div className="max-w-300 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white p-6 rounded-xl border border-[#c2c6d6] hover:shadow-lg transition-shadow"
            >
              <div
                className="w-12 h-12 bg-[#0058be]/10 text-[#0058be] rounded-lg flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-semibold text-[#151c27] mb-2">{feature.title}</h3>
              <p className="text-base text-[#424754]">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
