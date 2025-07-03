import { dynamicResourceHandler } from '../../../../utils/apiHandler';

export const runtime = 'edge';

export async function GET(request, { params }) {
  const { id } = params;
  return dynamicResourceHandler(request, 'tv', id);
} 