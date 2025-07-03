import { apiHandler } from '../../../../utils/apiHandler';

export const runtime = 'edge';

export async function GET(request, { params }) {
  const { id } = params;
  const allowedParams = ['language'];
  
  return apiHandler(request, `/collection/${id}`, allowedParams);
} 