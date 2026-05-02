import {Link} from 'react-router'
import {useScrollDirection} from "@/hooks/useScrollDirection.tsx";

export function Header() {
  const {scrollDir, isAtTop} = useScrollDirection();

  return (
    <header
      className={`w-full border-b border-border bg-background sticky top-0 z-50 transition-transform duration-300 ${
        scrollDir === 'down' && !isAtTop ? '-translate-y-full' : 'translate-y-0'
      }`}>
      <div className="flex w-full h-14 items-center justify-between px-16">
        <Link to="/" className="text-lg font-bold text-foreground">
          Url Shortner
        </Link>
        <a
          href="https://github.com/adem02/url-shortner-app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Github
        </a>
      </div>
    </header>
  )
}
