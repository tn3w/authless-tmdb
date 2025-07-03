import { NextResponse } from 'next/server';
import { apiHandler } from '../../../../utils/apiHandler';

export const runtime = 'edge';

export async function GET(request, { params }) {
  const { mediaType } = params;
  
  // Validate media type
  if (mediaType !== 'movie' && mediaType !== 'tv') {
    return NextResponse.json(
      { error: 'Invalid media type for discover. Must be "movie" or "tv".' },
      { status: 400 }
    );
  }
  
  const allowedParams = [
    'language',
    'region',
    'sort_by',
    'certification_country',
    'certification',
    'certification.lte',
    'certification.gte',
    'include_adult',
    'include_video',
    'page',
    'primary_release_year',
    'primary_release_date.gte',
    'primary_release_date.lte',
    'release_date.gte',
    'release_date.lte',
    'with_release_type',
    'year',
    'vote_count.gte',
    'vote_count.lte',
    'vote_average.gte',
    'vote_average.lte',
    'with_cast',
    'with_crew',
    'with_people',
    'with_companies',
    'with_genres',
    'with_keywords',
    'with_watch_providers',
    'watch_region',
    'without_genres',
    'with_runtime.gte',
    'with_runtime.lte',
    'with_original_language',
    'with_watch_monetization_types',
    'air_date.gte',
    'air_date.lte',
    'first_air_date.gte',
    'first_air_date.lte',
    'first_air_date_year',
    'timezone',
    'with_networks',
    'include_null_first_air_dates',
    'screened_theatrically',
    'with_status',
    'with_type'
  ];
  
  return apiHandler(request, `/discover/${mediaType}`, allowedParams);
} 