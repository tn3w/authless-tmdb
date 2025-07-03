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
        'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400'
      }
    });
  } catch (error) {
    console.error(`Error in API handler for ${path}:`, error);
    
    return NextResponse.json(
      { error: 'Failed to fetch data from TMDB' },
      { status: 500 }
    );
  }
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
    const allowedParams = ['language', 'append_to_response'];
    
    allowedParams.forEach(param => {
      if (searchParams.has(param)) {
        params[param] = searchParams.get(param);
      }
    });
    
    // If no specific subresource requested, append common subresources to fetch in one request
    if (!subresource && !params.append_to_response) {
      params.append_to_response = 'credits,images,recommendations,similar,keywords,external_ids';
    }

    const data = await fetchFromTMDB(path, params);
    
    // If a subresource was requested, return only that part
    if (subresource && !subresource.includes('append_to_response')) {
      return NextResponse.json(data, {
        status: 200,
        headers: {
          'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400'
        }
      });
    }
    
    // For full resource request, if only requesting subresource data, filter to just that data
    if (subresource && data[subresource]) {
      return NextResponse.json(data[subresource], {
        status: 200,
        headers: {
          'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400'
        }
      });
    }
    
    // Otherwise return all data
    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400'
      }
    });
  } catch (error) {
    console.error(`Error in dynamic resource handler for /${type}/${id}:`, error);
    
    return NextResponse.json(
      { error: 'Failed to fetch data from TMDB' },
      { status: 500 }
    );
  }
} 