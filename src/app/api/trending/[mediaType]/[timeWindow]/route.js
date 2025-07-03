import { NextResponse } from 'next/server';
import { filteredApiHandler } from '../../../../../utils/apiHandler';

export async function GET(request, { params }) {
  try {
    const { mediaType, timeWindow } = params;
    
    // Validate media type
    const validMediaTypes = ['all', 'movie', 'tv', 'person'];
    if (!validMediaTypes.includes(mediaType)) {
      return NextResponse.json(
        { error: `Invalid media type. Must be one of: ${validMediaTypes.join(', ')}` },
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
    
    // Validate time window
    const validTimeWindows = ['day', 'week'];
    if (!validTimeWindows.includes(timeWindow)) {
      return NextResponse.json(
        { error: `Invalid time window. Must be one of: ${validTimeWindows.join(', ')}` },
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
    
    // Parameters to pass directly to TMDB API
    const apiParams = ['language', 'page'];
    
    // Parameters to handle with server-side filtering
    const filterParams = ['region', 'include_adult', 'year'];
    
    return filteredApiHandler(request, `/trending/${mediaType}/${timeWindow}`, apiParams, filterParams);
  } catch (error) {
    console.error(`Error fetching trending ${params.mediaType}/${params.timeWindow}:`, error);
    
    return NextResponse.json(
      { error: 'Failed to fetch trending data' },
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