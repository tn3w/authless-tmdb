import { getEnv } from './env';

const TMDB_API_URL = 'https://api.themoviedb.org/3';

/**
 * Fetches data from TMDB API with authorization
 */
export async function fetchFromTMDB(path, params = {}) {
  const apiKey = getEnv('TMDB_API_KEY');
  
  const queryParams = new URLSearchParams(params).toString();
  const url = `${TMDB_API_URL}${path}${queryParams ? `?${queryParams}` : ''}`;

  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    next: {
      // Use Vercel Edge caching
      revalidate: getRevalidationTime(path)
    }
  });

  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status}`);
  }

  return response.json();
}

/**
 * Get revalidation time based on endpoint path
 */
function getRevalidationTime(path) {
  // Genres don't change often, cache them for a long time
  if (path.includes('/genre/')) {
    return 86400 * 7; // 7 days
  }
  
  // Trending data changes more frequently
  if (path.includes('/trending/')) {
    return 3600 * 6; // 6 hours
  }

  // Movie/TV details don't change very often
  if (path.match(/\/(movie|tv)\/\d+$/)) {
    return 86400; // 1 day
  }

  // Images, credits, recommendations don't change very often
  if (path.match(/\/(movie|tv)\/\d+\/(images|credits|recommendations|similar|keywords|external_ids)/)) {
    return 86400; // 1 day
  }

  // Collections change infrequently
  if (path.includes('/collection/')) {
    return 86400; // 1 day
  }
  
  // Default for other endpoints (like search)
  return 3600; // 1 hour
}

// Cache for genre data
let genreCache = {
  movie: null,
  tv: null
};

/**
 * Get genres for a specific media type (movie or tv)
 */
export async function getGenres(mediaType) {
  if (genreCache[mediaType]) {
    return genreCache[mediaType];
  }
  
  const data = await fetchFromTMDB(`/genre/${mediaType}/list`);
  genreCache[mediaType] = data.genres;
  return data.genres;
}

/**
 * Get all genres (both movie and tv)
 */
export async function getAllGenres() {
  const [movieGenres, tvGenres] = await Promise.all([
    getGenres('movie'),
    getGenres('tv')
  ]);
  
  return {
    movie: movieGenres,
    tv: tvGenres
  };
}

/**
 * Get trending items and filter by media type if needed
 */
export async function getTrending(mediaType = 'all', timeWindow = 'week') {
  // Always fetch all trending to maximize cache efficiency
  const data = await fetchFromTMDB(`/trending/all/${timeWindow}`);
  
  if (mediaType === 'all') {
    return data;
  }
  
  // Filter results by media type
  return {
    ...data,
    results: data.results.filter(item => item.media_type === mediaType)
  };
} 