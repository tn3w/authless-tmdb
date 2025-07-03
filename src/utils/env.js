// A utility to handle environment variables safely

/**
 * Get required environment variables
 * @param {string} name - The environment variable name
 * @param {boolean} throwOnMissing - Whether to throw an error if the variable is missing
 * @returns {string} The environment variable value
 */
export function getEnv(name, throwOnMissing = true) {
  const value = process.env[name];
  
  if (!value && throwOnMissing) {
    throw new Error(`Environment variable ${name} is required but was not set.`);
  }
  
  return value;
}

/**
 * Check if all required environment variables are set
 * @returns {boolean} Whether all required environment variables are set
 */
export function validateEnv() {
  const requiredEnvVars = ['TMDB_API_KEY'];
  const missingEnvVars = [];
  
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      missingEnvVars.push(envVar);
    }
  }
  
  if (missingEnvVars.length > 0) {
    console.error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
    return false;
  }
  
  return true;
} 