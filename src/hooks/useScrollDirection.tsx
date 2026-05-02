import {useState, useEffect} from 'react'

export function useScrollDirection() {
  const [scrollDir, setScrollDir] = useState<'up' | 'down'>('up')
  const [isAtTop, setIsAtTop] = useState(true)

  useEffect(() => {
    let lastY = window.scrollY

    const handleScroll = () => {
      const currentY = window.scrollY
      setIsAtTop(currentY < 10)
      setScrollDir(currentY > lastY ? 'down' : 'up')
      lastY = currentY
    }

    window.addEventListener('scroll', handleScroll, {passive: true})
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return {scrollDir, isAtTop}
}
