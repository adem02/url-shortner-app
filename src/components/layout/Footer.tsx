export function Footer() {
  return (
    <footer className="bg-slate-50 w-full mt-auto border-t border-slate-200">
      <div
        className="max-w-300 mx-auto flex flex-row justify-between items-center px-6 h-20 text-sm text-slate-500">
        <span>Made by Ahmed</span>

        <a
          href="https://github.com/adem02/url-shortner-app"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-600 transition-colors"
        >
          GitHub
        </a>
      </div>
    </footer>
  )
}
