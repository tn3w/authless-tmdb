import { NextResponse } from 'next/server';
import { dynamicResourceHandler } from '../../../../../utils/apiHandler';

export async function GET(request, { params }) {
  const { id, resource } = params;
  
  // Validate resource type
  const allowedResources = [
    'images',
    'credits',
    'recommendations',
    'similar',
    'keywords',
    'external_ids',
    'videos',
    'reviews',
    'content_ratings',
    'changes',
    'watch/providers',
    'episode_groups',
    'alternative_titles',
    'translations',
    'seasons',
    'episodes',
    'aggregate_credits'
  ];
  
  if (!allowedResources.includes(resource)) {
    return NextResponse.json(
      { error: `Invalid resource type. Must be one of: ${allowedResources.join(', ')}` },
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
  
  return dynamicResourceHandler(request, 'tv', id, resource);
} 