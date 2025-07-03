import { NextResponse } from 'next/server';
import { getGenres } from '../../../../../utils/tmdbApi';

export const runtime = 'edge';

export async function GET(request, { params }) {
  try {
    const { mediaType } = params;
    
    // Validate media type
    if (mediaType !== 'movie' && mediaType !== 'tv') {
      return NextResponse.json(
        { error: 'Invalid media type. Must be "movie" or "tv".' },
        { status: 400 }
      );
    }
    
    const genres = await getGenres(mediaType);
    
    return NextResponse.json({ genres }, {
      status: 200,
      headers: {
        // Cache genres for a long time since they rarely change
        'Cache-Control': 'public, max-age=604800, s-maxage=604800, stale-while-revalidate=2592000'
      }
    });
  } catch (error) {
    console.error('Error fetching genre list:', error);
    
    return NextResponse.json(
      { error: 'Failed to fetch genre list' },
      { status: 500 }
    );
  }
} 