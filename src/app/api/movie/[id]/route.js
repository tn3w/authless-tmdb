import { dynamicResourceHandler } from '../../../../utils/apiHandler';

export async function GET(request, { params }) {
  const { id } = params;
  return dynamicResourceHandler(request, 'movie', id);
} 