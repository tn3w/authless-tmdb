import { NextResponse } from 'next/server';
import { fetchFromTMDB } from './tmdbApi';

/**
 * Base API handler for TMDB proxy endpoints
 */
export async function apiHandler(request, path, allowedParams = []) {
  try {
    // Extract allowed query parameters
    const { searchParams } = new URL(request.url);
    const params = {};
    
    allowedParams.forEach(param => {
      if (searchParams.has(param)) {
        params[param] = searchParams.get(param);
      }
    });

    const data = await fetchFromTMDB(path, params);
    
    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
  } catch (error) {
    console.error(`Error in API handler for ${path}:`, error);
    
    return NextResponse.json(
      { error: 'Failed to fetch data from TMDB' },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      }
    );
  }
}

/**
 * API handler with server-side filtering for TMDB proxy endpoints
 */
export async function filteredApiHandler(request, path, allowedParams = [], filterParams = []) {
  try {
    // Extract all query parameters
    const { searchParams } = new URL(request.url);
    const params = {};
    const filters = {};
    
    // Process parameters for the TMDB API call
    allowedParams.forEach(param => {
      if (searchParams.has(param)) {
        params[param] = searchParams.get(param);
      }
    });
    
    // Process parameters for server-side filtering
    filterParams.forEach(param => {
      if (searchParams.has(param)) {
        filters[param] = searchParams.get(param);
      }
    });

    // Fetch data from TMDB
    let data = await fetchFromTMDB(path, params);
    
    // Apply server-side filtering if any filters are provided
    if (Object.keys(filters).length > 0 && data.results) {
      data.results = applyFilters(data.results, filters);
      
      // Update total_results count
      if (data.total_results) {
        data.total_results = data.results.length;
      }
    }
    
    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
  } catch (error) {
    console.error(`Error in filtered API handler for ${path}:`, error);
    
    return NextResponse.json(
      { error: 'Failed to fetch data from TMDB' },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      }
    );
  }
}

/**
 * Apply filters to the results
 */
function applyFilters(results, filters) {
  return results.filter(item => {
    // Filter by year
    if (filters.year) {
      const releaseDate = item.release_date || item.first_air_date;
      if (releaseDate) {
        const year = releaseDate.split('-')[0];
        if (year !== filters.year) return false;
      } else {
        // If no release date is available, exclude the item when filtering by year
        return false;
      }
    }
    
    // Filter by primary_release_year (for movies)
    if (filters.primary_release_year) {
      const releaseDate = item.release_date;
      if (releaseDate) {
        const year = releaseDate.split('-')[0];
        if (year !== filters.primary_release_year) return false;
      } else {
        // If no release date is available, exclude the item when filtering by primary_release_year
        return false;
      }
    }
    
    // Filter by region
    if (filters.region) {
      const countries = item.origin_country || item.production_countries?.map(c => c.iso_3166_1);
      if (countries && countries.length > 0) {
        if (!countries.includes(filters.region)) return false;
      } else {
        // No country information available
        return false;
      }
    }
    
    // Filter by include_adult
    if (filters.include_adult === 'false' && item.adult === true) {
      return false;
    }
    
    // Custom filtering for watch providers
    if (filters.with_watch_providers) {
      // This would need a separate API call to get watch providers for each item
      // For simplicity, we'll pass this through to the TMDB API instead
    }
    
    // Filter by first_air_date_year (for TV)
    if (filters.first_air_date_year && item.first_air_date) {
      const year = item.first_air_date.split('-')[0];
      if (year !== filters.first_air_date_year) return false;
    }
    
    return true;
  });
}

/**
 * Handler for dynamic resource requests (movie/tv details with ID)
 */
export async function dynamicResourceHandler(request, type, id, subresource = null) {
  try {
    const basePath = `/${type}/${id}`;
    const path = subresource ? `${basePath}/${subresource}` : basePath;
    
    // Extract allowed query parameters
    const { searchParams } = new URL(request.url);
    const params = {};

    // Common parameters for TMDB API
    const allowedParams = [
      'language',
      'append_to_response',
      'include_image_language',
      'include_video_language',
      'page',
      'region'
    ];
    
    // Additional parameters specific to certain subresources
    if (subresource === 'recommendations' || subresource === 'similar') {
      allowedParams.push('page', 'language');
    } else if (subresource === 'images') {
      allowedParams.push('include_image_language');
    } else if (subresource === 'videos') {
      allowedParams.push('include_video_language', 'language');
    } else if (subresource === 'credits') {
      allowedParams.push('language');
    }
    
    allowedParams.forEach(param => {
      if (searchParams.has(param)) {
        params[param] = searchParams.get(param);
      }
    });
    
    // If no specific subresource requested, append common subresources to fetch in one request
    if (!subresource && !params.append_to_response) {
      params.append_to_response = 'credits,images,recommendations,similar,keywords,external_ids,videos';
    }

    const data = await fetchFromTMDB(path, params);
    
    // If a subresource was requested, return only that part
    if (subresource && !subresource.includes('append_to_response')) {
      return NextResponse.json(data, {
        status: 200,
        headers: {
          'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      });
    }
    
    // For full resource request, if only requesting subresource data, filter to just that data
    if (subresource && data[subresource]) {
      return NextResponse.json(data[subresource], {
        status: 200,
        headers: {
          'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      });
    }
    
    // Otherwise return all data
    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
  } catch (error) {
    console.error(`Error in dynamic resource handler for /${type}/${id}:`, error);
    
    return NextResponse.json(
      { error: 'Failed to fetch data from TMDB' },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      }
    );
  }
} 