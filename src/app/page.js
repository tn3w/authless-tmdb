import styles from './page.module.css';
import Link from 'next/link';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1>Authless TMDB API</h1>
        <p>A serverless proxy for The Movie Database (TMDB) API that handles authentication and caching.</p>
        
        <div className={styles.links}>
          <Link href="/docs" className={styles.card}>
            View API Documentation
          </Link>
        </div>
        
        <h2>Available Endpoints</h2>
        <ul>
          <li><code>/api/genre/[type]/list</code> - Get genre lists for movies or TV shows</li>
          <li><code>/api/search/[type]</code> - Search for movies, TV shows, or people</li>
          <li><code>/api/discover/[type]</code> - Discover movies or TV shows</li>
          <li><code>/api/movie/[id]</code> - Get movie details</li>
          <li><code>/api/tv/[id]</code> - Get TV show details</li>
          <li><code>/api/movie/[id]/images</code> - Get movie images</li>
          <li><code>/api/tv/[id]/images</code> - Get TV show images</li>
          <li><code>/api/trending/[type]/[timeWindow]</code> - Get trending content</li>
          <li><code>/api/movie/[id]/recommendations</code> - Get movie recommendations</li>
          <li><code>/api/tv/[id]/recommendations</code> - Get TV show recommendations</li>
          <li><code>/api/collection/[id]</code> - Get collection details</li>
          <li><code>/api/movie/[id]/credits</code> - Get movie credits</li>
          <li><code>/api/tv/[id]/credits</code> - Get TV show credits</li>
          <li><code>/api/movie/[id]/similar</code> - Get similar movies</li>
          <li><code>/api/tv/[id]/similar</code> - Get similar TV shows</li>
          <li><code>/api/movie/[id]/keywords</code> - Get movie keywords</li>
          <li><code>/api/tv/[id]/keywords</code> - Get TV show keywords</li>
          <li><code>/api/movie/[id]/external_ids</code> - Get movie external IDs</li>
          <li><code>/api/tv/[id]/external_ids</code> - Get TV show external IDs</li>
        </ul>
        
        <h2>Benefits</h2>
        <ul>
          <li>No API key required - authentication is handled by the server</li>
          <li>Efficient caching to reduce API calls and improve performance</li>
          <li>Optimized for Vercel Edge Network</li>
        </ul>
      </div>
    </main>
  );
} 