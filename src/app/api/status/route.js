import { NextResponse } from 'next/server';
import { validateEnv } from '../../../utils/env';

export const runtime = 'edge';

/**
 * Simple endpoint to check if the API is working and properly configured
 */
export async function GET() {
  try {
    // Check if all required environment variables are set
    const envValid = validateEnv();
    
    return NextResponse.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      env_configured: envValid,
      message: envValid ? 'API is operational' : 'API is running but environment is not fully configured'
    }, {
      status: 200
    });
  } catch (error) {
    console.error('Error in status check:', error);
    
    return NextResponse.json({
      status: 'error',
      timestamp: new Date().toISOString(),
      message: 'API status check failed'
    }, {
      status: 500
    });
  }
} 