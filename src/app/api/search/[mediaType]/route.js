import { NextResponse } from 'next/server';
import { filteredApiHandler } from '../../../../utils/apiHandler';

export async function GET(request, { params }) {
  const { mediaType } = params;
  
  // Validate media type
  if (!['movie', 'tv', 'multi', 'person', 'collection', 'company'].includes(mediaType)) {
    return NextResponse.json(
      { error: 'Invalid media type for search' },
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
  const apiParams = ['query', 'language', 'page'];
  
  // Parameters to handle with server-side filtering
  const filterParams = ['include_adult', 'region', 'year', 'primary_release_year'];
  
  return filteredApiHandler(request, `/search/${mediaType}`, apiParams, filterParams);
} 