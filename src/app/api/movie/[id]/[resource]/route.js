import { NextResponse } from 'next/server';
import { dynamicResourceHandler } from '../../../../../utils/apiHandler';

export const runtime = 'edge';

export async function GET(request, { params }) {
  const { id, resource } = params;
  
  // Validate resource type
  const allowedResources = ['images', 'credits', 'recommendations', 'similar', 'keywords', 'external_ids'];
  
  if (!allowedResources.includes(resource)) {
    return NextResponse.json(
      { error: `Invalid resource type. Must be one of: ${allowedResources.join(', ')}` },
      { status: 400 }
    );
  }
  
  return dynamicResourceHandler(request, 'movie', id, resource);
} 