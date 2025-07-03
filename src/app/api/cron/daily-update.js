export default async function handler(req, res) {
    const { secret } = req.query;
    
    if (!secret || secret !== process.env.CRON_SECRET) {
      return res.status(401).json({ error: 'Unauthorized - Invalid or missing secret' });
    }
  
    try {
      const endpoints = [
        '/api/genre/movie/list',
        '/api/genre/tv/list',
        '/api/trending/all/week'
      ];
      
      const baseUrl = process.env.VERCEL_URL || `https://${req.headers.host}`;
      
      const results = await Promise.all(
        endpoints.map(async endpoint => {
          const response = await fetch(`${baseUrl}${endpoint}`, {
            method: 'GET',
            headers: { 
              'User-Agent': 'internal-cron',
              'x-internal-request': 'true'
            }
          });
          return {
            endpoint,
            status: response.status,
            success: response.ok
          };
        })
      );
      
      res.status(200).json({ 
        success: true, 
        message: 'All cron jobs completed',
        timestamp: new Date().toISOString(),
        results
      });
    } catch (error) {
      console.error('Cron job failed:', error);
      res.status(500).json({ 
        success: false, 
        error: error.message,
        timestamp: new Date().toISOString()
      });
    }
}