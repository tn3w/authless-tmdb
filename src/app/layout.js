import './globals.css'

export const metadata = {
  title: 'Authless TMDB API',
  description: 'A serverless proxy for The Movie Database (TMDB) API with authentication and caching',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <header>
          <div className="header-content">
            <h1>Authless TMDB</h1>
            <nav>
              <a href="/">Home</a>
              <a href="/docs">Documentation</a>
              <a href="/api/status">API Status</a>
            </nav>
          </div>
        </header>
        
        {children}
        
        <footer>
          <div className="footer-content">
            <p>
              Powered by <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer">Next.js</a> and <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">Vercel</a>
            </p>
            <p>
              This product uses the TMDB API but is not endorsed or certified by TMDB.
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
} 