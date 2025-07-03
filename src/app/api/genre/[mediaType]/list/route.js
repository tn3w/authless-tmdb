import { NextResponse } from 'next/server';
import { getGenres } from '../../../../../utils/tmdbApi';

export async function GET(request, { params }) {
  try {
    const { mediaType } = params;
    
    // Validate media type
    if (mediaType !== 'movie' && mediaType !== 'tv') {
      return NextResponse.json(
        { error: 'Invalid media type. Must be "movie" or "tv".' },
        { 
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
          }
        }
      );
    }
    
    const genres = await getGenres(mediaType);
    
    return NextResponse.json({ genres }, {
      status: 200,
      headers: {
        // Cache genres for a long time since they rarely change
        'Cache-Control': 'public, max-age=604800, s-maxage=604800, stale-while-revalidate=2592000',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
  } catch (error) {
    console.error('Error fetching genre list:', error);
    
    return NextResponse.json(
      { error: 'Failed to fetch genre list' },
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