# Authless TMDB API

A serverless proxy for The Movie Database (TMDB) API that handles authentication and provides efficient caching. This project is optimized for deployment on Vercel's Edge Network.

## Features

- **No API Key Required**: Authentication is handled server-side
- **Optimized Caching**: Utilizes Vercel's Edge Cache to minimize API calls and improve performance
- **Complete API Coverage**: Implements all essential TMDB API endpoints
- **Server-Side Filtering**: Optimized filtering implemented server-side
- **Edge Deployment**: Fast global response times with Vercel Edge Functions
- **Efficient Resource Usage**: Designed to minimize Vercel's compute units

## Available Endpoints

### Genre Lists
- `/api/genre/movie/list` - Get all movie genres
- `/api/genre/tv/list` - Get all TV show genres

### Search
- `/api/search/movie` - Search for movies
- `/api/search/tv` - Search for TV shows
- `/api/search/multi` - Search for movies, TV shows, and people
- `/api/search/person` - Search for people
- `/api/search/collection` - Search for collections
- `/api/search/company` - Search for companies

### Discover
- `/api/discover/movie` - Discover movies with various filters
- `/api/discover/tv` - Discover TV shows with various filters

### Movie Details
- `/api/movie/{id}` - Get detailed information about a movie
- `/api/movie/{id}/images` - Get movie images
- `/api/movie/{id}/credits` - Get movie cast and crew
- `/api/movie/{id}/recommendations` - Get movie recommendations
- `/api/movie/{id}/similar` - Get similar movies
- `/api/movie/{id}/keywords` - Get movie keywords
- `/api/movie/{id}/external_ids` - Get external IDs for a movie
- `/api/movie/{id}/videos` - Get movie videos
- `/api/movie/{id}/reviews` - Get movie reviews
- `/api/movie/{id}/lists` - Get lists containing the movie
- `/api/movie/{id}/changes` - Get movie changes
- `/api/movie/{id}/watch/providers` - Get movie watch providers
- `/api/movie/{id}/release_dates` - Get movie release dates
- `/api/movie/{id}/alternative_titles` - Get movie alternative titles
- `/api/movie/{id}/translations` - Get movie translations

### TV Show Details
- `/api/tv/{id}` - Get detailed information about a TV show
- `/api/tv/{id}/images` - Get TV show images
- `/api/tv/{id}/credits` - Get TV show cast and crew
- `/api/tv/{id}/recommendations` - Get TV show recommendations
- `/api/tv/{id}/similar` - Get similar TV shows
- `/api/tv/{id}/keywords` - Get TV show keywords
- `/api/tv/{id}/external_ids` - Get external IDs for a TV show
- `/api/tv/{id}/videos` - Get TV show videos
- `/api/tv/{id}/reviews` - Get TV show reviews
- `/api/tv/{id}/content_ratings` - Get TV content ratings
- `/api/tv/{id}/changes` - Get TV show changes
- `/api/tv/{id}/watch/providers` - Get TV show watch providers
- `/api/tv/{id}/episode_groups` - Get TV show episode groups
- `/api/tv/{id}/alternative_titles` - Get TV show alternative titles
- `/api/tv/{id}/translations` - Get TV show translations
- `/api/tv/{id}/seasons` - Get TV show seasons
- `/api/tv/{id}/episodes` - Get TV show episodes
- `/api/tv/{id}/aggregate_credits` - Get aggregated credits for TV show

### Person Details
- `/api/person/{id}` - Get detailed information about a person
- `/api/person/{id}/movie_credits` - Get movie credits for a person
- `/api/person/{id}/tv_credits` - Get TV credits for a person
- `/api/person/{id}/combined_credits` - Get combined (movie and TV) credits for a person
- `/api/person/{id}/external_ids` - Get external IDs for a person
- `/api/person/{id}/images` - Get images of a person
- `/api/person/{id}/tagged_images` - Get tagged images of a person
- `/api/person/{id}/translations` - Get translated data for a person
- `/api/person/{id}/changes` - Get changes for a person

### Trending
- `/api/trending/all/day` - Get trending content for the day
- `/api/trending/all/week` - Get trending content for the week
- `/api/trending/movie/day` - Get trending movies for the day
- `/api/trending/movie/week` - Get trending movies for the week
- `/api/trending/tv/day` - Get trending TV shows for the day
- `/api/trending/tv/week` - Get trending TV shows for the week
- `/api/trending/person/day` - Get trending people for the day
- `/api/trending/person/week` - Get trending people for the week

### Collections
- `/api/collection/{id}` - Get collection details

## Server-Side Filtering

This API implements server-side filtering for several parameters, allowing for more efficient and flexible queries:

- **include_adult**: Filter out adult content (default: false)
- **region**: Filter by region/country
- **year**: Filter by release year
- **primary_release_year**: Filter movies by their primary release year

For example:
```
/api/search/movie?query=matrix&include_adult=false&year=1999
```

## Caching Strategy

This API implements an intelligent caching strategy to minimize API calls to TMDB:

- **Genre lists**: Cached for 7 days (rarely change)
- **Movie/TV details**: Cached for 24 hours
- **Trending data**: Cached for 6 hours
- **Search results**: Cached for 1 hour
- **Images, credits, etc.**: Cached for 24 hours

Whenever possible, the API uses a broader request strategy to fetch and cache related data at once. For example, when fetching a movie, it also fetches credits, images, recommendations, and other related data.

## Deployment

### Prerequisites

- A Vercel account
- A TMDB API key (for server use only)

### Environment Variables

Set the following environment variable in your Vercel project:

- `TMDB_API_KEY`: Your TMDB API key

### Deploying to Vercel

1. Clone this repository
2. Link it with your Vercel account
3. Set the required environment variables
4. Deploy with the Vercel CLI or GitHub integration

```bash
# Install Vercel CLI if you haven't already
npm install -g vercel

# Deploy to Vercel
vercel
```

## Local Development

```bash
# Clone the repository
git clone https://github.com/yourusername/authless-tmdb.git
cd authless-tmdb

# Install dependencies
npm install

# Create a .env.local file with your TMDB API key
echo "TMDB_API_KEY=your_tmdb_api_key_here" > .env.local

# Start the development server
npm run dev
```

## License

Copyright 2025 TN3W

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.