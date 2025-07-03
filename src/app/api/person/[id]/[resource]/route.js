import { NextResponse } from 'next/server';
import { dynamicResourceHandler } from '../../../../../utils/apiHandler';

export async function GET(request, { params }) {
  const { id, resource } = params;
  
  // Validate resource type
  const allowedResources = [
    'movie_credits',
    'tv_credits',
    'combined_credits',
    'external_ids',
    'images',
    'tagged_images',
    'translations',
    'changes'
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
  
  return dynamicResourceHandler(request, 'person', id, resource);
} 