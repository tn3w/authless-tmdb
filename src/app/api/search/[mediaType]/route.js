import { NextResponse } from 'next/server';
import { apiHandler } from '../../../../utils/apiHandler';

export const runtime = 'edge';

export async function GET(request, { params }) {
  const { mediaType } = params;
  
  // Validate media type
  if (!['movie', 'tv', 'multi', 'person', 'collection', 'company'].includes(mediaType)) {
    return NextResponse.json(
      { error: 'Invalid media type for search' },
      { status: 400 }
    );
  }
  
  const allowedParams = ['query', 'language', 'page', 'include_adult', 'region', 'year', 'primary_release_year'];
  
  return apiHandler(request, `/search/${mediaType}`, allowedParams);
} 