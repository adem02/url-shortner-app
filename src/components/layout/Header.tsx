import {Link} from 'react-router'

export function Header() {
  return (
    <header className="w-full border-b border-border bg-background">
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
