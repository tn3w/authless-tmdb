import styles from '../page.module.css';

export default function DocsPage() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1>Authless TMDB API Documentation</h1>
        
        <h2>Overview</h2>
        <p>
          This API provides authless access to The Movie Database (TMDB) data. It proxies requests to TMDB's API
          while handling authentication and providing efficient caching.
        </p>
        
        <h2>Base URL</h2>
        <code>https://your-deployment-url.vercel.app/api</code>
        
        <h2>Endpoints</h2>
        
        <h3>Genre Lists</h3>
        <div>
          <h4>GET /genre/[type]/list</h4>
          <p>Get a list of genres for movies or TV shows.</p>
          <p><strong>Parameters:</strong></p>
          <ul>
            <li><code>type</code>: Either 'movie' or 'tv'</li>
          </ul>
          <p><strong>Example:</strong> <code>/api/genre/movie/list</code></p>
        </div>
        
        <h3>Search</h3>
        <div>
          <h4>GET /search/[type]</h4>
          <p>Search for movies, TV shows, people, etc.</p>
          <p><strong>Parameters:</strong></p>
          <ul>
            <li><code>type</code>: 'movie', 'tv', 'multi', 'person', etc.</li>
            <li><code>query</code>: Search term</li>
            <li><code>page</code>: Page number (optional)</li>
            <li><code>language</code>: ISO 639-1 language code (optional)</li>
          </ul>
          <p><strong>Example:</strong> <code>/api/search/movie?query=avengers</code></p>
        </div>
        
        <h3>Discover</h3>
        <div>
          <h4>GET /discover/[type]</h4>
          <p>Discover movies or TV shows by different filters.</p>
          <p><strong>Parameters:</strong></p>
          <ul>
            <li><code>type</code>: Either 'movie' or 'tv'</li>
            <li><code>sort_by</code>: Field to sort by (optional)</li>
            <li><code>page</code>: Page number (optional)</li>
            <li><code>with_genres</code>: Filter by genre ID (optional)</li>
            <li>Many other filters available (see TMDB documentation)</li>
          </ul>
          <p><strong>Example:</strong> <code>/api/discover/movie?sort_by=popularity.desc&with_genres=28</code></p>
        </div>
        
        <h3>Movie/TV Details</h3>
        <div>
          <h4>GET /[type]/[id]</h4>
          <p>Get detailed information about a movie or TV show.</p>
          <p><strong>Parameters:</strong></p>
          <ul>
            <li><code>type</code>: Either 'movie' or 'tv'</li>
            <li><code>id</code>: TMDB ID of the movie or TV show</li>
            <li><code>language</code>: ISO 639-1 language code (optional)</li>
          </ul>
          <p><strong>Example:</strong> <code>/api/movie/550</code> (Fight Club)</p>
        </div>
        
        <h3>Subresources</h3>
        <div>
          <h4>GET /[type]/[id]/[resource]</h4>
          <p>Get a specific resource related to a movie or TV show.</p>
          <p><strong>Parameters:</strong></p>
          <ul>
            <li><code>type</code>: Either 'movie' or 'tv'</li>
            <li><code>id</code>: TMDB ID of the movie or TV show</li>
            <li><code>resource</code>: One of 'images', 'credits', 'recommendations', 'similar', 'keywords', 'external_ids'</li>
          </ul>
          <p><strong>Example:</strong> <code>/api/movie/550/credits</code></p>
        </div>
        
        <h3>Trending</h3>
        <div>
          <h4>GET /trending/[type]/[timeWindow]</h4>
          <p>Get trending content.</p>
          <p><strong>Parameters:</strong></p>
          <ul>
            <li><code>type</code>: 'all', 'movie', 'tv', or 'person'</li>
            <li><code>timeWindow</code>: Either 'day' or 'week'</li>
          </ul>
          <p><strong>Example:</strong> <code>/api/trending/movie/week</code></p>
        </div>
        
        <h3>Collections</h3>
        <div>
          <h4>GET /collection/[id]</h4>
          <p>Get details of a movie collection.</p>
          <p><strong>Parameters:</strong></p>
          <ul>
            <li><code>id</code>: TMDB collection ID</li>
          </ul>
          <p><strong>Example:</strong> <code>/api/collection/10</code> (Star Wars Collection)</p>
        </div>
        
        <h2>Caching</h2>
        <p>
          This API uses Vercel's Edge Cache to provide fast responses and reduce the load on TMDB's servers.
          Different endpoints have different cache durations based on how frequently their data changes.
        </p>
        <ul>
          <li>Genre lists: Cached for 7 days</li>
          <li>Movie/TV details: Cached for 24 hours</li>
          <li>Trending data: Cached for 6 hours</li>
          <li>Search results: Cached for 1 hour</li>
        </ul>
        
        <p>
          <a href="/">Back to Home</a>
        </p>
      </div>
    </main>
  );
} 