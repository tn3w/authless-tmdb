import { NextResponse } from 'next/server';
import { getTrending } from '../../../../../utils/tmdbApi';

export const runtime = 'edge';

export async function GET(request, { params }) {
  try {
    const { mediaType, timeWindow } = params;
    
    // Validate media type
    const validMediaTypes = ['all', 'movie', 'tv', 'person'];
    if (!validMediaTypes.includes(mediaType)) {
      return NextResponse.json(
        { error: `Invalid media type. Must be one of: ${validMediaTypes.join(', ')}` },
        { status: 400 }
      );
    }
    
    // Validate time window
    const validTimeWindows = ['day', 'week'];
    if (!validTimeWindows.includes(timeWindow)) {
      return NextResponse.json(
        { error: `Invalid time window. Must be one of: ${validTimeWindows.join(', ')}` },
        { status: 400 }
      );
    }
    
    const data = await getTrending(mediaType, timeWindow);
    
    return NextResponse.json(data, {
      status: 200,
      headers: {
        // Trending data changes more frequently, cache for shorter time
        'Cache-Control': 'public, max-age=3600, s-maxage=21600, stale-while-revalidate=86400'
      }
    });
  } catch (error) {
    console.error(`Error fetching trending ${params.mediaType}/${params.timeWindow}:`, error);
    
    return NextResponse.json(
      { error: 'Failed to fetch trending data' },
      { status: 500 }
    );
  }
} 